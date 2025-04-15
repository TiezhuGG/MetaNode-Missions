import BackButton from "@/components/back-button";
import { MarkdownRender } from "@/components/markdown/render";
import { createClient } from "@/lib/server";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();

  if (slug) {
    const { data: post } = await supabase
      .from("posts")
      .select()
      .eq("slug", slug)
      .single();

    return {
      title: post.title,
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) notFound();

  const { title, content, description, author, inserted_at } = post;

  return (
    <div>
      <article className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-sm text-gray-400">{description}</p>
        <div className="flex justify-between items-center text-sm mt-2.5">
          <div className="flex">
            <p className="mr-2">发布于</p>
            <Calendar className="size-4" />
            <time className="text-sm ml-1">{formatDate(inserted_at)}</time>
          </div>
          <p>作者：{author}</p>
        </div>
        <div className="prose dark:prose-invert max-w-none space-y-4 leading-7">
          <MarkdownRender content={content}></MarkdownRender>
        </div>
      </article>

      <div className="w-full flex justify-center my-5">
        <BackButton />
      </div>
    </div>
  );
}
