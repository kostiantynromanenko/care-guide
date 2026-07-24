import type { CollectionConfig } from "payload";

export const Articles: CollectionConfig = {
  slug: "articles",
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
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "body",
      type: "blocks",
      required: true,
      blocks: [
        {
          slug: "paragraph",
          fields: [
            {
              name: "text",
              type: "textarea",
              required: true,
            },
          ],
        },
        {
          slug: "heading",
          fields: [
            {
              name: "text",
              type: "text",
              required: true,
            },
          ],
        },
        {
          slug: "list",
          fields: [
            {
              name: "items",
              type: "text",
              hasMany: true,
              required: true,
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
    },
  ],
};
