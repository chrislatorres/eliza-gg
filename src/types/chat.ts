import { Message } from "ai";

export interface Citation {
  url: string;
  content: string;
}

export interface ChatStreamData {
  citations?: Citation[];
}

export interface ChatRequest {
  messages: Message[];
}

export interface ChatResponse extends ChatStreamData {
  id: string;
  messages: Message[];
}
