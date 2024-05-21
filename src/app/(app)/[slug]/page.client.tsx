"use client";

import { RichText } from "@/components";
import { Page } from "@/payload-types";
import { useLivePreview } from "@payloadcms/live-preview-react";

export const PageTemplate: React.FC<{ page: Page | null | undefined }> = ({
  page,
}) => {
  const { data } = useLivePreview({
    serverURL: process.env.PUBLIC_PAYLOAD_URL || "",
    depth: 2,
    initialData: page,
  });

  return (
    <main>
      <RichText content={data?.content} />
    </main>
  );
};
