"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "@/components/markdown/editor";
import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";

type FormData = {
  title: string;
  content: string;
  author: string;
  description: string;
  slug: string;
};

export default function Page() {
  const supabase = createClient();
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("posts").insert({
      title: data.title,
      content: data.content,
      author: data.slug,
      description: data.slug,
      slug: data.slug,
      user_id: user?.id,
    });

    if (!error) router.push(`/`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">创建新文章</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center">
          <label className="w-12 mr-5">标题:</label>
          <input
            {...register("title", { required: true })}
            className="outline rounded h-10 px-4 flex-1"
            placeholder="请输入文章标题"
          />
        </div>

        <div className="flex items-center">
          <label className="w-12 mr-5">描述:</label>
          <input
            {...register("description", { required: true })}
            className="outline rounded h-10 px-4 flex-1"
            placeholder="请输入描述"
          />
        </div>

        <div className="flex items-center">
          <label className="w-12 mr-5">作者:</label>
          <input
            {...register("author", { required: true })}
            className="outline rounded h-10 px-4 flex-1"
            placeholder="请输入作者"
          />
        </div>

        <div className="flex items-center">
          <label className="w-12 mr-5">slug:</label>
          <input
            {...register("slug", { required: true })}
            className="outline rounded h-10 px-4 flex-1"
            placeholder="请输入slug"
          />
        </div>

        <MarkdownEditor
          value={watch("content") || ""}
          onChange={(val) => setValue("content", val)}
        />

        <div className="flex justify-center gap-4">
          <Button onClick={() => router.back()}>返回</Button>
          <Button type="submit" className="cursor-pointer">
            发布文章
          </Button>
        </div>
      </form>
    </div>
  );
}
