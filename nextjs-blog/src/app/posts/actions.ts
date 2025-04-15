"use server";

import { redirect } from "next/navigation";
import { PostType } from "./types";
import { createClient } from "@/lib/server";

export async function createPost(data: PostType) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("posts").insert({
    ...data,
    user_id: user?.id as string,
  });

  if (!error) {
    redirect(`/`);
  }
}

export async function updatePost(postId: number, data: PostType) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("posts")
    .update(data)
    .eq("id", postId)
    .eq("user_id", user?.id as string);

  if (!error) {
    redirect(`/`);
  }
}
