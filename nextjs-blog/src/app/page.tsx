import { MainNav } from "@/components/main-nav";
import { createClient } from "@/lib/server";
import PostList from "./posts/list/page";
import { PaginationComponent } from "@/components/pagination";
import { calculateTotalPages } from "@/lib/pagination";

type SearchParamsType = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParamsType;
}) {
  const { page } = await searchParams;
  const supabase = await createClient();
  const pageSize = 10;
  const currentPage = +page || 1;
  console.log(await searchParams);

  const { data: posts, count } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .order("inserted_at", { ascending: false })
    .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

  const totalPages = calculateTotalPages(count || 0, pageSize);

  console.log(posts, count, totalPages);
  
  return (
    <>
      <MainNav />
      <PostList posts={posts ?? []} />
      <div className="my-5">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
