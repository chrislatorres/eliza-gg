import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const imageExamplePrompts: string[] = [
  "in a cyberpunk city at night",
  "exploring ancient ruins in a jungle",
  "floating in space with planets in the background",
  "in a cozy coffee shop working on a laptop",
];

interface ImageExamplePromptsProps {
  onPromptSelect: (prompt: string) => void;
}

export function ImageExamplePrompts({
  onPromptSelect,
}: ImageExamplePromptsProps) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 md:gap-4">
      {imageExamplePrompts.map((prompt, index) => (
        <button
          key={index}
          className={clsx([
            "!shrink-0 !rounded-full !px-3 !py-1 !text-xs !flex !items-center !gap-2 hover:cursor-pointer",
            // Base
            "relative isolate inline-flex items-center justify-center gap-x-2 rounded-md border text-base/6 font-medium",
            // Focus
            "focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500",
            // Disabled
            "disabled:opacity-50 disabled:pointer-events-none",
            // Icon
            "*[data-slot=icon]:-mx-0.5 *[data-slot=icon]:my-0.5 *[data-slot=icon]:size-5 *[data-slot=icon]:shrink-0 *[data-slot=icon]:text-(--btn-icon) sm:*[data-slot=icon]:my-1 sm:*[data-slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:hover:[--btn-icon:ButtonText]",
            // Base
            "border-zinc-950/10 text-zinc-950 data-active:bg-zinc-950/[2.5%] data-hover:bg-zinc-950/[2.5%]",
            // Dark mode
            "dark:border-white/15 dark:text-white dark:[--btn-bg:transparent] dark:data-active:bg-white/5 dark:data-hover:bg-white/5 dark:hover:bg-white/5",
            // Icon
            "[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]",
          ])}
          onClick={() => onPromptSelect(prompt)}
        >
          {prompt}
          <ArrowUpRightIcon className="h-3 w-3" />
        </button>
      ))}
    </div>
  );
}
