import type { CollectionConfig } from "payload";

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: {
    singular: { en: "Article", uk: "Стаття" },
    plural: { en: "Articles", uk: "Статті" },
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
      label: { en: "Title", uk: "Заголовок" },
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
      name: "excerpt",
      type: "textarea",
      required: true,
      label: { en: "Excerpt", uk: "Короткий опис" },
    },
    {
      name: "body",
      type: "blocks",
      required: true,
      label: { en: "Body", uk: "Вміст статті" },
      labels: {
        singular: { en: "Block", uk: "Блок" },
        plural: { en: "Blocks", uk: "Блоки" },
      },
      blocks: [
        {
          slug: "paragraph",
          labels: {
            singular: { en: "Paragraph", uk: "Абзац" },
            plural: { en: "Paragraphs", uk: "Абзаци" },
          },
          fields: [
            {
              name: "text",
              type: "textarea",
              required: true,
              label: { en: "Text", uk: "Текст" },
            },
          ],
        },
        {
          slug: "heading",
          labels: {
            singular: { en: "Heading", uk: "Заголовок розділу" },
            plural: { en: "Headings", uk: "Заголовки розділів" },
          },
          fields: [
            {
              name: "text",
              type: "text",
              required: true,
              label: { en: "Text", uk: "Текст" },
            },
          ],
        },
        {
          slug: "list",
          labels: {
            singular: { en: "List", uk: "Список" },
            plural: { en: "Lists", uk: "Списки" },
          },
          fields: [
            {
              name: "items",
              type: "text",
              hasMany: true,
              required: true,
              label: { en: "Items", uk: "Пункти" },
            },
          ],
        },
      ],
    },
    {
      name: "relatedCollections",
      type: "relationship",
      relationTo: "collections",
      hasMany: true,
      label: { en: "Related collections", uk: "Пов'язані добірки" },
    },
  ],
};
