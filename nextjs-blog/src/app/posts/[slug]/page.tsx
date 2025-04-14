import BackButton from "@/components/back-button";
import { createClient } from "@/lib/server";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <div className="w-full flex justify-center">
        <BackButton />
      </div>
    </div>
  );
}
