import type { CollectionConfig } from "payload";

export const Needs: CollectionConfig = {
  slug: "needs",
  labels: {
    singular: { en: "Need", uk: "Потреба" },
    plural: { en: "Needs", uk: "Потреби" },
  },
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: { en: "Title", uk: "Назва" },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: { en: "Slug", uk: "Slug (адреса)" },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: { en: "Description", uk: "Опис" },
    },
  ],
};
