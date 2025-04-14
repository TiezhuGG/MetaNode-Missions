import PostItem, { PostType } from "@/components/post-item";
import Actions from "./actions";

interface Props {
  posts: PostType[] | null;
}

export default function PostList({ posts }: Props) {
  return (
    <main className="max-w-[1200px] mx-auto px-10 mt-10">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts?.map((post) => (
          <div className="relative group" key={post.id}>
            <PostItem key={post.id} post={post} />
            <Actions id={post.id} />
          </div>
        ))}
      </ul>
    </main>
  );
}
