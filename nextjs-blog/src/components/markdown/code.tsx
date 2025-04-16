"use client";

import { useEffect } from "react";

export function Code({
  inline,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const language = className?.replace("language-", "") || "plaintext";

  useEffect(() => {
    const initHighlight = async () => {
      if (typeof window !== "undefined") {
        const hljs = await import("highlight.js");
        await import("highlight.js/lib/common");
        return hljs.default;
      }
    };
    initHighlight();
  }, [children]);

  return !inline ? (
    <code className={className} {...props}>
      {children}
    </code>
  ) : (
    <pre className="rounded-lg my-5">
      <code className={`language-${language}`} {...props}>
        {children}
      </code>
    </pre>
  );
}
