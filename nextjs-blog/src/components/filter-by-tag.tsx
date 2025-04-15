"use client";

import { getTags } from "@/app/api/tags/actions";
import { Tag } from "@/app/posts/types";
import { useEffect, useState } from "react";

export default function FilterByTag({
  onChange,
}: {
  onChange: (tagId: string) => void;
}) {
  const [tags, setTags] = useState<Tag[]>([]);

  const handleGetTags = async () => {
    const data = await getTags();
    data?.unshift({ id: "All", name: "All" });
    setTags(data);
  };

  useEffect(() => {
    handleGetTags();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-5">
      {tags.map((tag) => (
        <div key={tag.id}>
          <button
            className="cursor-pointer hover:bg-amber-200 focus:bg-amber-200 py-2 px-3 rounded-3xl"
            onClick={() => onChange(tag.id)}
          >
            {tag.name}
          </button>
        </div>
      ))}
    </div>
  );
}
