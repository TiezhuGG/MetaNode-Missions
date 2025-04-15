import { createClient } from "@/lib/client";
import PostForm from "@/components/post-form";
import { PostType } from "../../types";
import { notFound } from "next/navigation";
import { updatePost } from "../../actions";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createClient();

  const { data: postData } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!postData) notFound();

  const updateAction = async (data: PostType) => {
    "use server";

    return updatePost(postData.id, data);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <PostForm postData={postData} action={updateAction} />
    </div>
  );
}
