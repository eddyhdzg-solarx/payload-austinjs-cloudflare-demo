import configPromise from "@payload-config";
import { getPayload } from "payload";

export const getPages = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "pages",
    currentDepth: 2,
  });

  return data?.docs ?? [];
};
