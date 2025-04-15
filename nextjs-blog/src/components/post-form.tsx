"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "@/components/markdown/editor";
import { PostType } from "@/app/posts/types";
import BackButton from "./back-button";
import { TagInput } from "./tag-input";

interface formProps {
  postData?: PostType | null;
  action: (data: PostType) => Promise<void>;
}

export default function PostForm({ postData, action }: formProps) {
  const { register, handleSubmit, setValue, watch } = useForm<PostType>({
    defaultValues: postData,
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        {postData ? "编辑" : "新建"}文章
      </h1>

      <form onSubmit={handleSubmit(action)} className="space-y-6">
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

        <div className="flex items-center">
          <label className="w-12 mr-5">标签:</label>
          <TagInput
            selectedTags={watch("tag_id") || []}
            onSelect={(val) => setValue("tag_id", val)}
          />
        </div>

        <MarkdownEditor
          value={watch("content") || ""}
          onChange={(val) => setValue("content", val)}
        />

        <div className="flex justify-center gap-4">
          <BackButton />
          <Button type="submit" className="cursor-pointer">
            {postData ? "保存修改" : "发布文章"}
          </Button>
        </div>
      </form>
    </div>
  );
}
