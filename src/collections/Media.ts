import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: { en: "Media", uk: "Медіафайл" },
    plural: { en: "Media", uk: "Медіафайли" },
  },
  admin: {
    useAsTitle: "alt",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "media",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: { en: "Alt text", uk: "Опис зображення (alt)" },
    },
  ],
};
