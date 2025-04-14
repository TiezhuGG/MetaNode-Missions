"use client";

import { useEffect } from "react";

export function Code({
  inline,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const language = className?.replace("language-", "") || "plaintext";

  const setupHighlight = async () => {
    if (typeof window !== "undefined") {
      const hljs = await import("highlight.js");
      await import("highlight.js/lib/common");
      return hljs.default;
    }
  };

  useEffect(() => {
    const initHighlight = async () => {
      const hljs = await setupHighlight();
      if (hljs) {
        // 手动触发高亮
        document.querySelectorAll("pre code").forEach((block) => {
          hljs.highlightElement(block);
        });

        // 添加复制按钮等扩展功能
        // addCopyButtons();
      }
    };
    initHighlight();
  }, [children]);

  return !inline ? (
    <pre className={`rounded-lg p-4 my-5 ${className}`}>
      <code className={className} {...props}>
        {children}
      </code>
    </pre>
  ) : (
    <pre className="rounded-lg my-5">
      <code className={`language-${language}`} {...props}>
        {children}
      </code>
    </pre>
  );
}
