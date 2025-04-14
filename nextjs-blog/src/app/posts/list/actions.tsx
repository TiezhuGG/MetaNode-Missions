"use client";

import { handleDeletePost } from "@/app/login/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Actions({ ...props }) {
  const { id } = props;
  const router = useRouter();

  const onHandleDeletePost = async (id: number) => {
    const result = await handleDeletePost(id);
    router.refresh();
    toast.success(result.message);
  };

  return (
    <>
      <button
        className="absolute top-2 right-12 cursor-pointer hidden group-hover:block"
        onClick={() => router.push(`/posts/edit`)}
      >
        ✏️
      </button>
      <button
        className="absolute top-2 right-2 cursor-pointer hidden group-hover:block"
        onClick={() => onHandleDeletePost(id)}
      >
        🗑️
      </button>
    </>
  );
}
