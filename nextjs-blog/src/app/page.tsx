import { MainNav } from "@/components/main-nav";
import PostItem from "@/components/post-item";
import { createClient } from "@/lib/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase.from("posts").select();

  if (error) {
    alert(JSON.stringify(error));
  }

  return (
    <>
      <MainNav />
      <main className="px-10 mt-10">
        <div className="grid grid-cols-2 gap-5">
          {posts?.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}
