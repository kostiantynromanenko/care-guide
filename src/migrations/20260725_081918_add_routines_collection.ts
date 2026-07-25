import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_routines_area" AS ENUM('face', 'hair');
  CREATE TABLE "routines_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"product_id" integer
  );
  
  CREATE TABLE "routines" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"area" "enum_routines_area" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "routines_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "routines_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"collections_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "routines_id" integer;
  ALTER TABLE "routines_steps" ADD CONSTRAINT "routines_steps_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "routines_steps" ADD CONSTRAINT "routines_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."routines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "routines_texts" ADD CONSTRAINT "routines_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."routines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "routines_rels" ADD CONSTRAINT "routines_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."routines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "routines_rels" ADD CONSTRAINT "routines_rels_collections_fk" FOREIGN KEY ("collections_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "routines_steps_order_idx" ON "routines_steps" USING btree ("_order");
  CREATE INDEX "routines_steps_parent_id_idx" ON "routines_steps" USING btree ("_parent_id");
  CREATE INDEX "routines_steps_product_idx" ON "routines_steps" USING btree ("product_id");
  CREATE UNIQUE INDEX "routines_slug_idx" ON "routines" USING btree ("slug");
  CREATE INDEX "routines_updated_at_idx" ON "routines" USING btree ("updated_at");
  CREATE INDEX "routines_created_at_idx" ON "routines" USING btree ("created_at");
  CREATE INDEX "routines_texts_order_parent" ON "routines_texts" USING btree ("order","parent_id");
  CREATE INDEX "routines_rels_order_idx" ON "routines_rels" USING btree ("order");
  CREATE INDEX "routines_rels_parent_idx" ON "routines_rels" USING btree ("parent_id");
  CREATE INDEX "routines_rels_path_idx" ON "routines_rels" USING btree ("path");
  CREATE INDEX "routines_rels_collections_id_idx" ON "routines_rels" USING btree ("collections_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_routines_fk" FOREIGN KEY ("routines_id") REFERENCES "public"."routines"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_routines_id_idx" ON "payload_locked_documents_rels" USING btree ("routines_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "routines_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "routines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "routines_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "routines_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "routines_steps" CASCADE;
  DROP TABLE "routines" CASCADE;
  DROP TABLE "routines_texts" CASCADE;
  DROP TABLE "routines_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_routines_fk";
  
  DROP INDEX "payload_locked_documents_rels_routines_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "routines_id";
  DROP TYPE "public"."enum_routines_area";`)
}
