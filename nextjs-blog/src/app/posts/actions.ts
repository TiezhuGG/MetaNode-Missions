"use server";

import { redirect } from "next/navigation";
import { PostType } from "./types";
import { createClient } from "@/lib/server";

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

  const { error } = await supabase.from("posts_tags").insert(
    postData.tag_id.map((tagId) => ({
      post_id: post?.id,
      tag_id: tagId,
    }))
  );

  if (!error && !postError) {
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
