import { createTurso } from "@/libs/indexer/utils/create-turso";
import { embed } from "@/libs/indexer/utils/embed";
import { getOpenRouterModel } from "@/libs/indexer/utils/models";
import { createDataStreamResponse, streamText } from "ai";

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return Response.json({ error: "Not allowed" }, { status: 403 });
  }

  const { messages } = await request.json();
  const lastMessage = messages[messages.length - 1];
  const query = lastMessage.content;

  if (!query) {
    return Response.json({ error: "Missing query parameter" }, { status: 400 });
  }

  console.time(`embed-${query.slice(0, 10)}`);
  const queryEmbedding = await embed(query);
  console.timeEnd(`embed-${query.slice(0, 10)}`);

  const turso = createTurso();

  console.time("search");
  const { rows } = await turso.execute({
    sql: `
      SELECT
        hash,
        title,
        url,
        content,
        vector_distance_cos(full_emb, vector32(?)) as similarity
      FROM docs
      ORDER BY similarity ASC
      LIMIT 5
    `,
    args: [`[${queryEmbedding.join(", ")}]`],
  });
  console.timeEnd("search");

  const results = rows.map((row) => row[3]).join("\n");

  console.log(results);

  const searchResults = rows.map((row) => ({
    url: row[2] as string,
    content: row[3] as string,
  }));

  return createDataStreamResponse({
    execute: async (dataStream) => {
      // Write initial citations
      dataStream.writeData({
        citations: searchResults.map((result) => ({
          url: result.url,
          content: result.content.slice(0, 200) + "...", // Preview of content
          title: result.content.split("Title: ")[1].split("\n")[0],
        })),
      });

      const result = streamText({
        model: getOpenRouterModel("anthropic/claude-3.5-sonnet:beta"),
        system:
          `You are a helpful assistant called Eliza.gg for the Eliza open source framework and the ElizaOS operating system.

Relevant docs:
\`\`\`
${results}
\`\`\`

Rules:
- Always cite your sources.
- When citing, respond with citation tag.
- When referencing information, cite the source using <reference index={1}>1</reference>, <reference index={2}>2</reference>, etc. corresponding to the order of citations provided.
- At the end of the response, do not list the references, you are only citing.
`.trim(),
        messages,
      });

      result.mergeIntoDataStream(dataStream);
    },
  });
}
