"use client";

import PostItem from "@/components/post-item";
import { PostType } from "../types";
import Actions from "./actions";
import FilterByTag from "@/components/filter-by-tag";
import { useEffect, useState } from "react";

interface Props {
  posts: PostType[] | null;
  allPosts: PostType[] | null;
}

export default function PostList({ posts, allPosts }: Props) {
  const [currentTagId, setCurrentTagId] = useState<string>("All");
  const [filterPosts, setFilterPosts] = useState(posts);

  useEffect(() => {
    if (currentTagId === "All") {
      setFilterPosts(posts);
    } else {
      const newAllPost = allPosts?.filter((post) => {
        if (post.tag_id && post.tag_id.includes(currentTagId as string)) {
          return post;
        }
      });

      setFilterPosts(newAllPost as PostType[]);
    }
  }, [currentTagId]);

  return (
    <main className="max-w-[1200px] mx-auto px-10 mt-10">
      <FilterByTag onChange={setCurrentTagId} />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filterPosts?.map((post) => (
          <article className="relative group" key={post.id}>
            <PostItem key={post.id} post={post} />
            <Actions id={post.id} slug={post.slug} />
          </article>
        ))}
      </ul>
    </main>
  );
}
