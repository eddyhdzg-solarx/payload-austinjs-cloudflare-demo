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
      <div>PUBLIC_SERVER_URL: {PUBLIC_SERVER_URL}</div>
      <RichText content={data?.content} />
    </main>
  );
};
