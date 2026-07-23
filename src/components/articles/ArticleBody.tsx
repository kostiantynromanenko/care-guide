import type { ArticleBlock } from "@/types/content";

/**
 * Renders the simple structured content blocks used by demo articles.
 * Intentionally minimal (paragraph/heading/list) — a richer editor-driven
 * format belongs to the future Payload CMS phase, not this prototype.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-4 text-ink/75 leading-relaxed">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2 key={index} className="text-lg sm:text-xl font-bold pt-2">
              {block.text}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="list-disc pl-5 space-y-1.5">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
