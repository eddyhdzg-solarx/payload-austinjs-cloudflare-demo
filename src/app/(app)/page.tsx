import { notFound } from "next/navigation";
import { getPage } from "@/server";
import { RichText } from "@/components";

export const revalidate = 10;

export default async function Page() {
  const page = await getPage("index");

  if (page === null) {
    return notFound();
  }

  return (
    <main>
      <RichText content={page?.content} />
    </main>
  );
}
