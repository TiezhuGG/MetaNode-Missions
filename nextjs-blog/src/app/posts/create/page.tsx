import PostForm from "@/components/post-form";
import { createPost } from "../actions";

export default function Page() {
  return (
    <div className="container mx-auto py-8 px-4">
      <PostForm action={createPost}></PostForm>
    </div>
  );
}
