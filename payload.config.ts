import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { en } from "@payloadcms/translations/languages/en";
import { uk } from "@payloadcms/translations/languages/uk";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { Needs } from "./src/collections/Needs";
import { Products } from "./src/collections/Products";
import { Collections } from "./src/collections/Collections";
import { Articles } from "./src/collections/Articles";
import { SiteSettings } from "./src/globals/SiteSettings";
import { Notices } from "./src/globals/Notices";
import { HowItWorks } from "./src/globals/HowItWorks";

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
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  collections: [Users, Media, Needs, Products, Collections, Articles],
  globals: [SiteSettings, Notices, HowItWorks],
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  sharp,
});
