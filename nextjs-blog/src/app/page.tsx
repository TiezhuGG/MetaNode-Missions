import { MainNav } from "@/components/main-nav";
import { createClient } from "@/lib/server";
import PostList from "./posts/list/page";

export default async function Home() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase.from("posts").select();

  if (error) {
    alert(JSON.stringify(error));
  }

  return (
    <>
      <MainNav />
      <PostList posts={posts ?? []} />
    </>
  );
}
