import * as migration_20260724_072604_initial_schema from './20260724_072604_initial_schema';
import * as migration_20260724_184835_add_product_source_fields from './20260724_184835_add_product_source_fields';
import * as migration_20260725_081918_add_routines_collection from './20260725_081918_add_routines_collection';
import * as migration_20260725_133249_add_body_area from './20260725_133249_add_body_area';

export const migrations = [
  {
    up: migration_20260724_072604_initial_schema.up,
    down: migration_20260724_072604_initial_schema.down,
    name: '20260724_072604_initial_schema',
  },
  {
    up: migration_20260724_184835_add_product_source_fields.up,
    down: migration_20260724_184835_add_product_source_fields.down,
    name: '20260724_184835_add_product_source_fields',
  },
  {
    up: migration_20260725_081918_add_routines_collection.up,
    down: migration_20260725_081918_add_routines_collection.down,
    name: '20260725_081918_add_routines_collection',
  },
  {
    up: migration_20260725_133249_add_body_area.up,
    down: migration_20260725_133249_add_body_area.down,
    name: '20260725_133249_add_body_area'
  },
];
