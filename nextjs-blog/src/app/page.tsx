import { MainNav } from "@/components/main-nav";
import PostList from "./posts/list/page";
import { PaginationComponent } from "@/components/pagination";
import { getAllPosts, getPostsByPage } from "./posts/actions";

type SearchParamsType = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function Home({
  searchParams,
}: {
  searchParams?: SearchParamsType;
}) {
  const { page } = await searchParams;

  const { posts, currentPage, totalPages } = await getPostsByPage(page);

  const allPosts = await getAllPosts();

  return (
    <>
      <MainNav />
      <PostList posts={posts ?? []} allPosts={allPosts} />
      <div className="my-5">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
