"use client";

import { ExamplePrompts } from "@/components/app/example-prompts";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const LandingTextarea = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const handleCreateSearch = useCallback((prompt: string) => {
    push(`/search?q=${prompt}`);
  }, []);

  const handleSubmit = useCallback(
    (e: any) => {
      try {
        e?.preventDefault();

        setIsLoading(true);
        handleCreateSearch(input);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    },
    [input]
  );

  const handlePromptSelect = useCallback((prompt: string) => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
      handleCreateSearch(prompt);
    } else {
      toast.info("Coming soon!");
      return;
    }
  }, []);

  return (
    <div className="flex flex-col w-full gap-4">
      <span
        data-slot="control"
        className={clsx([
          "relative block w-full",
          "dark:before:hidden",
          "before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none",
        ])}
      >
        <div
          className={clsx([
            "relative block size-full appearance-none overflow-hidden rounded-lg",
            "text-base/6 text-zinc-950 placeholder:text-zinc-400 sm:text-sm/6 dark:text-white",
            "bg-zinc-950/5 dark:bg-white/5",
            "focus:outline-none",
            "data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-600 data-[invalid]:data-[hover]:dark:border-red-600",
            "disabled:border-zinc-950/20 disabled:dark:border-white/15 disabled:dark:bg-white/[2.5%] dark:data-[hover]:disabled:border-white/15",
            "ring-offset-background",
            "focus-within:ring-2 focus-within:ring-zinc-200 focus-within:dark:ring-zinc-800",
            "border border-zinc-200 dark:border-zinc-800",
          ])}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
                handleSubmit(e);
              } else {
                toast.info("Coming soon!");
                return;
              }
            }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative min-h-[36px] w-full">
              <textarea
                aria-label="Prompt"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question about Eliza..."
                className={clsx([
                  "size-full bg-transparent",
                  "relative block size-full appearance-none",
                  "placeholder:text-zinc-500",
                  "resize-none",
                  "focus:outline-none",
                  "scrollbar scrollbar-thumb-zinc-700 scrollbar-thumb-rounded-full scrollbar-w-[4px]",
                  "text-base/6 sm:text-sm/6",
                  "border-none outline-none focus:outline-none focus:ring-0 focus:ring-offset-0",
                  "p-0 px-4 pt-3",
                  "field-sizing-content resize-none",
                  "scrollbar-thin scrollbar-thumb-rounded-md",
                  "max-h-[48vh]",
                ])}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
                      handleSubmit(e);
                    } else {
                      toast.info("Coming soon!");
                      return;
                    }
                  }
                }}
              />
            </div>
            <div className="flex w-full items-center justify-between px-2 pb-2.5">
              <div />
              <Button
                type="submit"
                color={(input ? "orange" : "dark") as "orange" | "dark"}
                disabled={!input || isLoading}
                aria-label="Submit"
                className="size-8"
              >
                {isLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <ArrowRightIcon className="!h-3 !w-3 !shrink-0" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </span>

      <ExamplePrompts onPromptSelect={handlePromptSelect} />
    </div>
  );
};