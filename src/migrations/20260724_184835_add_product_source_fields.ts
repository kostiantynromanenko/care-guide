import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" ADD COLUMN "source_url" varchar;
  ALTER TABLE "products" ADD COLUMN "vendor_code" varchar;
  ALTER TABLE "products" ADD COLUMN "price" numeric;
  ALTER TABLE "products" ADD COLUMN "in_stock" boolean;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" DROP COLUMN "source_url";
  ALTER TABLE "products" DROP COLUMN "vendor_code";
  ALTER TABLE "products" DROP COLUMN "price";
  ALTER TABLE "products" DROP COLUMN "in_stock";`)
}
