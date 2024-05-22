// export const PUBLIC_SERVER_URL =
//   process.env.NODE_ENV === "production"
//     ? `https://${process.env.VERCEL_URL}`
//     : process.env.NODE_ENV === "development"
//     ? process.env.NEXT_PUBLIC_SITE_URL
//     : process.env.NEXT_PUBLIC_SERVER_URL;

export const PUBLIC_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SERVER_URL;
