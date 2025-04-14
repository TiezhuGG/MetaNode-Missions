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

export interface PostType {
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
    <Card className="h-[180px] flex relative group hover:bg-gray-50 dark:hover:text-gray-950">
      <Link
        href={`/posts/${slug}`}
        className="flex flex-col justify-between flex-1"
      >
        <CardHeader>
          <CardTitle>
            <h1 className="text-xl">{title}</h1>
          </CardTitle>
          <CardDescription>
            <p className="mt-1 line-clamp-2">{description}</p>
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
