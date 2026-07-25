import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { en } from "@payloadcms/translations/languages/en";
import { uk } from "@payloadcms/translations/languages/uk";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { Needs } from "./src/collections/Needs";
import { Products } from "./src/collections/Products";
import { Collections } from "./src/collections/Collections";
import { Routines } from "./src/collections/Routines";
import { Articles } from "./src/collections/Articles";
import { SiteSettings } from "./src/globals/SiteSettings";
import { Notices } from "./src/globals/Notices";
import { HowItWorks } from "./src/globals/HowItWorks";
import { migrations } from "./src/migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  i18n: {
    supportedLanguages: { en, uk },
    fallbackLanguage: "uk",
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      // Local dev (docker-compose) sets DATABASE_URI. Vercel's Postgres/Neon
      // integration instead injects DATABASE_URL (a sensitive var whose value
      // can't be read back to manually copy into DATABASE_URI), so fall back
      // to it automatically in production — see docs/DEPLOYMENT.md.
      connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL || "",
    },
    // The adapter only auto-syncs the schema (`push`) when NODE_ENV !== "production"
    // (see @payloadcms/db-postgres's connect.js) — Vercel always sets NODE_ENV=production,
    // so without this, production tables are never created. `prodMigrations` runs
    // automatically on connect when NODE_ENV === "production" instead. Regenerate with
    // `npx payload migrate:create` after schema changes (collections/globals/fields).
    prodMigrations: migrations,
  }),
  collections: [Users, Media, Needs, Products, Collections, Routines, Articles],
  globals: [SiteSettings, Notices, HowItWorks],
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  sharp,
  plugins: [
    // Serverless hosts (e.g. Vercel) have an ephemeral/read-only filesystem, so
    // uploads can't live on local disk in production. When BLOB_READ_WRITE_TOKEN
    // is unset (local dev), this plugin disables itself and Media falls back to
    // local disk storage (see src/collections/Media.ts) automatically.
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
