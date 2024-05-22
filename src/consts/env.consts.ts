export const PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://payload-austinjs-cloudflare-demo.vercel.app/"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

// export const PUBLIC_SERVER_URL =
//   process.env.VERCEL_ENV === "production"
//     ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
//     : process.env.NEXT_PUBLIC_SERVER_URL;

// export function PUBLIC_SERVER_URL {
//   return process.env.VERCEL_ENV === "production"
//     ? `https://payload-austinjs-cloudflare-demo.vercel.app/`
//     : process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}`
//     : `http://localhost:3000`;
// }
