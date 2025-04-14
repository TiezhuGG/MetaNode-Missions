"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import { Code } from "@/components/markdown/code";
import "highlight.js/styles/github-dark.css";

export function MarkdownRender({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        [rehypeHighlight, { ignoreMissing: true }],
        // rehypeSanitize({
        //   tagNames: ["marquee", "blink"], // 明确禁止危险标签
        //   protocols: {
        //     src: ["http", "https", "data"],
        //   },
        //   attributes: {
        //     "*": ["className"],
        //     code: ["language"],
        //     span: ["style"],
        //   },
        // })
      ]}
      components={{
        code: Code,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
