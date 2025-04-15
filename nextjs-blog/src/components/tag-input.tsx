// components/TagInput.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/app/posts/types";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { getTags, addTag } from "@/app/api/tags/actions";

export function TagInput({
  selectedTags,
  onSelect,
}: {
  selectedTags: string[];
  onSelect: (tags: string[]) => void;
}) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [search, setSearch] = useState("");

  const handleGetTags = async () => {
    const data = await getTags();
    setTags(data);
  };
  
  useEffect(() => {
    handleGetTags();
  }, []);

  const handleAddTag = async () => {
    const { success, message } = await addTag(search);

    toast(message);
    if (success) {
      setSearch("");
      handleGetTags();
    }
  };

  const handleTagToggle = (tagId: string) => {
    const newTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];

    onSelect(newTags);
  };

  return (
    <div className="flex space-y-2">
      <Command>
        <div className="flex items-center">
          <div className="flex flex-col">
            <CommandInput
              placeholder="搜索或创建标签..."
              value={search}
              onValueChange={setSearch}
            />
            <Button className="mt-3 cursor-pointer" onClick={handleAddTag}>
              添加标签
            </Button>
          </div>

          <CommandList className="ml-5">
            {tags
              .filter(
                (tag) =>
                  tag.name.toLowerCase().includes(search.toLowerCase()) &&
                  !selectedTags.includes(tag.id)
              )
              .map((tag) => (
                <CommandItem
                  className="cursor-pointer"
                  key={tag.id}
                  onSelect={() => handleTagToggle(tag.id)}
                >
                  <Badge
                    //   style={{ backgroundColor: tag.color }}
                    className="text-white"
                  >
                    {tag.name}
                  </Badge>
                </CommandItem>
              ))}
          </CommandList>
        </div>
      </Command>

      <div className="flex flex-col gap-2 ml-10 px-3 py-2">
        {selectedTags.map((tagId) => {
          const tag = tags.find((t) => t.id === tagId);
          return tag ? (
            <Badge
              key={tagId}
              //   style={{ backgroundColor: tag.color }}
              className="cursor-pointer text-white"
              onClick={() => handleTagToggle(tagId)}
            >
              {tag.name} ×
            </Badge>
          ) : null;
        })}
      </div>
    </div>
  );
}
