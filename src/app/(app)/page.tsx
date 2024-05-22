import { notFound } from "next/navigation";
import { getPage } from "@/server";
import { PageTemplate } from "./[slug]/page.client";

export const dynamic = "force-dynamic";

export default async function Page() {
  const page = await getPage("index");

  if (page === null) {
    return notFound();
  }

  return <PageTemplate page={page} />;
}
