"use client";

import { RichText } from "@/components";
import { PUBLIC_SERVER_URL } from "@/consts";
import { Page } from "@/payload-types";
import { useLivePreview } from "@payloadcms/live-preview-react";

export const PageTemplate: React.FC<{ page: Page | null | undefined }> = ({
  page,
}) => {
  const { data } = useLivePreview({
    serverURL: PUBLIC_SERVER_URL,
    depth: 30,
    initialData: page,
  });

  return (
    <main>
      <div>env: {PUBLIC_SERVER_URL}</div>
      <div>NODE_ENV: {process.env.NODE_ENV}</div>
      <div>VERCEL_URL: {process.env.VERCEL_URL}</div>
      <div>NEXT_PUBLIC_SERVER_URL: {process.env.NEXT_PUBLIC_SERVER_URL}</div>
      <RichText content={data?.content} />
    </main>
  );
};
