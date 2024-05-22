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
      env: {PUBLIC_SERVER_URL}
      <RichText content={data?.content} />
    </main>
  );
};
