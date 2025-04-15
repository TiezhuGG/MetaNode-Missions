"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Code } from "@/components/markdown/code";
import "highlight.js/styles/github-dark.css";

export function MarkdownRender({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
      components={{
        code: Code,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
