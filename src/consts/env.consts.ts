import getConfig from "next/config";

// export const PUBLIC_SERVER_URL =
//   process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
//     ? "https://payload-austinjs-cloudflare-demo.vercel.app/"
//     : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
//     ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
//     : "http://localhost:3000";

export const PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

/**
 * public facing URL including https://
 */
export const buildUrl = (): string => {
  const { env } = getConfig();
  return env.BASE_URL;
};
