import configPromise from "@payload-config";
import { getPayload } from "payload";

export const getPage = async (slug: string) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "pages",
    currentDepth: 2,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return data?.docs?.[0] ?? null;
};
