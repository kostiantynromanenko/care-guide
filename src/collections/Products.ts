import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: { en: "Product", uk: "Засіб" },
    plural: { en: "Products", uk: "Засоби" },
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
      name: "role",
      type: "text",
      required: true,
      label: { en: "Role in routine", uk: "Роль у рутині" },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: { en: "Description", uk: "Опис" },
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
      label: { en: "Tags", uk: "Теги" },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
      label: { en: "Image", uk: "Зображення" },
    },
  ],
};
