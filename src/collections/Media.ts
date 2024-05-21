import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
