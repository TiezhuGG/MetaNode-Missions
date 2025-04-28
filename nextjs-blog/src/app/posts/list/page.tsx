"use client";

import PostItem from "@/components/post-item";
import { PostType, Tag } from "../types";
import Actions from "./actions";
import FilterByTag from "@/components/filter-by-tag";
import { useEffect, useState } from "react";
import { getTags } from "@/app/api/tags/actions";

interface Props {
  posts: PostType[];
  allPosts: PostType[];
}

export default function PostList({ posts, allPosts }: Props) {
  const [currentTagId, setCurrentTagId] = useState<string>("All");
  const [filterPosts, setFilterPosts] = useState(posts);
  const [tags, setTags] = useState<Tag[]>([]);

  const handleGetTags = async () => {
    const data = await getTags();
    data?.unshift({ id: "All", name: "All" });
    setTags(data);
  };

  const handlePostDeleted = (deletedId: number) => {
    setFilterPosts((posts) => posts.filter((post) => post.id !== deletedId));
  };

  useEffect(() => {
    handleGetTags();
  }, []);

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
      <FilterByTag tags={tags} onChange={setCurrentTagId} />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filterPosts?.map((post) => (
          <article className="relative group" key={post.id}>
            <PostItem key={post.id} post={post} />
            <Actions
              id={post.id}
              slug={post.slug}
              onDelete={handlePostDeleted}
            />
          </article>
        ))}
      </ul>
    </main>
  );
}
