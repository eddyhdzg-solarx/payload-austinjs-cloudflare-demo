import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { BlocksFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload/config";
import { fileURLToPath } from "url";
import { s3Storage } from "@payloadcms/storage-s3";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages/Pages";
import { Users } from "./collections/Users";
import { alertBlock } from "./blocks/alertBlock";
import { buttonsBlock } from "./blocks/buttonsBlock";
import { PUBLIC_SERVER_URL } from "./consts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    livePreview: {
      collections: ["pages"],
      url: ({ data }) => `${PUBLIC_SERVER_URL}/${data.slug}`,
    },
  },
  collections: [Media, Pages, Users],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({ blocks: [alertBlock, buttonsBlock] }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET || "",
      config: {
        endpoint: process.env.R2_ENDPOINT,
        region: process.env.R2_REGION,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        },
      },
    }),
  ],
});
