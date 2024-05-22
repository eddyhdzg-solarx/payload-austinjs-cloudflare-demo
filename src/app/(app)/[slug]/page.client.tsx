"use client";

import { RichText } from "@/components";
import { PUBLIC_SERVER_URL } from "@/consts";
import { Page } from "@/payload-types";
import { useLivePreview } from "@payloadcms/live-preview-react";

export const PageTemplate: React.FC<{ page: Page | null | undefined }> = ({
  page,
}) => {
  const { data } = useLivePreview({
    serverURL: PUBLIC_SERVER_URL || "",
    initialData: page,
  });

  return (
    <main>
      <div>NODE_ENV: {process.env.NODE_ENV}</div>
      <div>VERCEL_ENV: {process.env.VERCEL_ENV}</div>
      <div>NEXT_PUBLIC_VERCEL_ENV: {process.env.NEXT_PUBLIC_VERCEL_ENV}</div>
      <div>VERCEL_URL: {process.env.VERCEL_URL}</div>
      <div>NEXT_PUBLIC_VERCEL_URL: {process.env.NEXT_PUBLIC_VERCEL_URL}</div>
      <div>PUBLIC_SERVER_URL: {PUBLIC_SERVER_URL}</div>
      <RichText content={data?.content} />
    </main>
  );
};
