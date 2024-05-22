declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // # Payload Default
      DATABASE_URI: string;
      PAYLOAD_SECRET: string;

      // # R2 Cloudflare
      R2_ACCESS_KEY_ID: string;
      R2_SECRET_ACCESS_KEY: string;
      R2_BUCKET: string;
      R2_REGION: string;
      R2_ENDPOINT: string;

      // # Payload Live Preview
      NEXT_PUBLIC_SERVER_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
