import { notFound } from "next/navigation";
import { getPage, getPages } from "@/server";
// import { PageTemplate } from "./page.client";
import { RichText } from "@/components";

interface PageParams {
  params: { slug: string };
}

export async function generateStaticParams() {
  const pages = await getPages();

  return pages.map(({ slug }) =>
    slug !== "index"
      ? {
          slug,
        }
      : {}
  );
}

export default async function Page({ params: { slug = "index" } }: PageParams) {
  const page = await getPage(slug);

  if (page === null) {
    return notFound();
  }

  return (
    <main>
      <RichText content={page?.content} />
    </main>
  );
}
