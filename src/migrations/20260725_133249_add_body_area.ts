import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_collections_area" ADD VALUE 'body';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "collections" ALTER COLUMN "area" SET DATA TYPE text;
  DROP TYPE "public"."enum_collections_area";
  CREATE TYPE "public"."enum_collections_area" AS ENUM('face', 'hair');
  ALTER TABLE "collections" ALTER COLUMN "area" SET DATA TYPE "public"."enum_collections_area" USING "area"::"public"."enum_collections_area";`)
}
