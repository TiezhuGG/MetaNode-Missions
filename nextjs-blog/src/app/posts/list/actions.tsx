"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deletePost } from "../actions";

export default function Actions({
  id,
  slug,
  onDelete,
}: {
  id: number;
  slug: string;
  onDelete: (id: number) => void;
}) {
  const router = useRouter();

  const handleDeletePost = async (id: number) => {
    const result = await deletePost(id);
    onDelete(id);
    toast.success(result.message);
    router.refresh();
  };

  return (
    <>
      <button
        className="absolute top-2 right-12 cursor-pointer hidden group-hover:block"
        onClick={() => router.push(`/posts/${slug}/edit`)}
      >
        ✏️
      </button>
      <button
        className="absolute top-2 right-2 cursor-pointer hidden group-hover:block"
        onClick={() => handleDeletePost(id)}
      >
        🗑️
      </button>
    </>
  );
}
