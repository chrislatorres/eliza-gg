"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface TextareaWithActionsProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const TextareaWithActions = ({
  input,
  onInputChange,
  onSubmit,
  isLoading,
}: TextareaWithActionsProps) => {
  return (
    <div className="flex flex-col w-full">
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
            "bg-zinc-100 dark:bg-zinc-950",
            "focus:outline-none",
            "data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-600 data-[invalid]:data-[hover]:dark:border-red-600",
            "disabled:border-zinc-950/20 disabled:dark:border-white/15 disabled:dark:bg-white/[2.5%] dark:data-[hover]:disabled:border-white/15",
            "ring-offset-background",
            // "focus-within:ring-2 focus-within:dark:ring-[#ff8c00]/20 focus-within:ring-[#ff8c00]/20",
            "focus-within:ring-2 focus-within:dark:ring-white/15 focus-within:ring-zinc-950/15",
            "border border-zinc-950/5 dark:border-white/5",
            "relative",
          ])}
        >
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative min-h-[36px] w-full">
              <textarea
                autoFocus
                aria-label="Prompt"
                value={input}
                onChange={onInputChange}
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
                    onSubmit(e);
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
                  <Loader2 className="!h-3 !w-3 !shrink-0 animate-spin" />
                ) : (
                  <ArrowRightIcon className="!h-3 !w-3 !shrink-0" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </span>
    </div>
  );
};
