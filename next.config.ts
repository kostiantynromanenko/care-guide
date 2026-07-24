import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Production Media uploads are served directly from Vercel Blob
        // (see @payloadcms/storage-vercel-blob in payload.config.ts), not
        // proxied through the app, so next/image needs this allow-listed.
        // Local dev uploads are served same-origin and need no entry here.
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default withPayload(nextConfig);
