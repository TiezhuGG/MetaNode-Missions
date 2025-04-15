import BackButton from "@/components/back-button";
import { MarkdownRender } from "@/components/markdown/render";
import { createClient } from "@/lib/server";
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

  return (
    <div>
      <article className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-4 leading-7">
          <MarkdownRender content={post.content}></MarkdownRender>
        </div>
      </article>

      <div className="w-full flex justify-center my-5">
        <BackButton />
      </div>
    </div>
  );
}
