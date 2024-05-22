// export const PUBLIC_SERVER_URL =
//   process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
//     ? "https://payload-austinjs-cloudflare-demo.vercel.app/"
//     : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
//     ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
//     : "http://localhost:3000";

export const PUBLIC_SERVER_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000";
