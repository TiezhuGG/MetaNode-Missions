import { Tag } from "@/app/posts/types";

export default function FilterByTag({
  tags,
  onChange,
}: {
  tags: Tag[];
  onChange: (tagId: string) => void;
}) {
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
