// export const PUBLIC_SERVER_URL =
//   process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
//     ? "https://payload-austinjs-cloudflare-demo.vercel.app/"
//     : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
//     ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
//     : "http://localhost:3000";

export const PUBLIC_SERVER_URL =
  process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;

// if (process.env.VERCEL_ENV === "production") {
//   domain = process.env.VERCEL_URL;
// } else if (process.env.VERCEL_ENV === "preview") {
//   domain = process.env.VERCEL_URL;
// } else {
//   domain = `http://localhost:${process.env.PORT || 3000}`;
// }
