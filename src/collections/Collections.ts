import type { CollectionConfig } from "payload";

export const Collections: CollectionConfig = {
  slug: "collections",
  labels: {
    singular: { en: "Collection", uk: "Добірка" },
    plural: { en: "Collections", uk: "Добірки" },
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
    {
      name: "area",
      type: "select",
      required: true,
      label: { en: "Area", uk: "Область догляду" },
      options: [
        { label: "Обличчя", value: "face" },
        { label: "Волосся", value: "hair" },
        { label: "Тіло", value: "body" },
      ],
    },
    {
      name: "routineSize",
      type: "text",
      required: true,
      label: { en: "Routine size", uk: "Розмір рутини" },
    },
    {
      name: "sequences",
      type: "array",
      label: { en: "Sequences", uk: "Схеми (напр. ранок / вечір)" },
      labels: {
        singular: { en: "Sequence", uk: "Схема" },
        plural: { en: "Sequences", uk: "Схеми" },
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          label: { en: "Label", uk: "Назва схеми (напр. «Вранці»)" },
        },
        {
          name: "steps",
          type: "array",
          label: { en: "Steps", uk: "Кроки" },
          labels: {
            singular: { en: "Step", uk: "Крок" },
            plural: { en: "Steps", uk: "Кроки" },
          },
          fields: [
            {
              name: "number",
              type: "number",
              required: true,
              label: { en: "Number", uk: "Номер" },
            },
            {
              name: "title",
              type: "text",
              required: true,
              label: { en: "Title", uk: "Назва кроку" },
            },
            {
              name: "description",
              type: "textarea",
              required: true,
              label: { en: "Description", uk: "Опис" },
            },
            {
              name: "product",
              type: "relationship",
              relationTo: "products",
              required: false,
              label: { en: "Product", uk: "Засіб" },
            },
          ],
        },
      ],
    },
    {
      name: "recommendedProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      label: { en: "Recommended products", uk: "Рекомендовані засоби" },
    },
    {
      name: "usageNotes",
      type: "text",
      hasMany: true,
      label: { en: "Usage notes", uk: "Нотатки з використання" },
    },
    {
      name: "relatedCollections",
      type: "relationship",
      relationTo: "collections",
      hasMany: true,
      label: { en: "Related collections", uk: "Схожі добірки" },
    },
  ],
};
