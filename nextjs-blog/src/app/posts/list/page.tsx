import PostItem, { PostType } from "@/components/post-item";
import Actions from "./actions";

interface Props {
  posts: PostType[] | null;
}

export default function PostList({ posts }: Props) {
  return (
    <>
      <main className="px-10 mt-10">
        <div className="grid grid-cols-2 gap-5">
          {posts?.map((post) => (
            <div className="relative group" key={post.id}>
              <PostItem key={post.id} post={post} />
              <Actions id={post.id} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
