import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface PostType {
  id: number;
  title: string;
  author: string;
  description: string;
  content: string;
  slug: string;
  inserted_at: string;
}

export default function PostItem({ post }: { post: PostType }) {
  const { title, slug, author, description, inserted_at } = post;
  return (
    <Card className="hover:bg-gray-50 dark:hover:text-gray-950">
      <Link href={`/posts/${slug}`}>
        <CardHeader>
          <CardTitle>
            <h1 className="text-xl">{title}</h1>
          </CardTitle>
          <CardDescription>
            <p className="mt-1">
              {description}
              本文介绍了如何使用Shell脚本实现自动打包前端项目并且上传到服务器上
            </p>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between text-gray-400 mt-4">
          <div className="flex">
            <Calendar className="size-4" />
            <p className="text-sm ml-1">{formatDate(inserted_at)}</p>
          </div>
          <p>{author}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}
