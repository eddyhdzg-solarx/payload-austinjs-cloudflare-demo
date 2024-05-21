"use client";

import { RichText } from "@/components";
import { PUBLIC_SITE_URL } from "@/consts";
import { Page } from "@/payload-types";
import { useLivePreview } from "@payloadcms/live-preview-react";

export const PageTemplate: React.FC<{ page: Page | null | undefined }> = ({
  page,
}) => {
  const { data } = useLivePreview({
    serverURL: PUBLIC_SITE_URL,
    depth: 2,
    initialData: page,
  });

  return (
    <main>
      <RichText content={data?.content} />
    </main>
  );
};
