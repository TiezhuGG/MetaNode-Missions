"use server";

import { redirect } from "next/navigation";
import { PostType } from "./types";
import { createClient } from "@/lib/server";
import { calculateTotalPages } from "@/lib/pagination";

export async function getAllPosts() {
  const supabase = await createClient();

  const { data: allPosts } = await supabase.from("posts").select("*");

  return allPosts;
}

export async function getPostsByPage(page: number) {
  const supabase = await createClient();
  const pageSize = 10;
  const currentPage = +page || 1;

  const { data: posts, count } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .order("inserted_at", { ascending: false })
    .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

  const totalPages = calculateTotalPages(count || 0, pageSize);

  return { posts, currentPage, totalPages };
}

export async function createPost(postData: PostType) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: post, error: postError } = await supabase
    .from("posts")
    .insert({
      ...postData,
      user_id: user?.id,
    })
    .select()
    .single();

  if (postData?.tag_id?.length) {
    const { error } = await supabase.from("posts_tags").insert(
      postData.tag_id.map((tagId) => ({
        post_id: post?.id,
        tag_id: tagId,
      }))
    );

    if (!error) redirect("/");
  }

  if (!postError) {
    redirect(`/`);
  }
}

export async function updatePost(postId: number, postData: PostType) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: post, error: postError } = await supabase
    .from("posts")
    .update(postData)
    .eq("id", postId)
    .eq("user_id", user?.id)
    .select()
    .single();

  const { error } = await supabase.from("posts_tags").upsert(
    postData.tag_id.map((tagId) => ({
      post_id: post?.id,
      tag_id: tagId,
    }))
  );

  if (!error && !postError) {
    redirect(`/`);
  }
}

export async function handleDeletePost(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    redirect("/error");
  } else {
    return { message: "删除成功" };
  }
}
