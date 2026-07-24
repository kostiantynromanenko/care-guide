import type { CollectionConfig } from "payload";

export const Collections: CollectionConfig = {
  slug: "collections",
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
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "area",
      type: "select",
      required: true,
      options: [
        { label: "Обличчя", value: "face" },
        { label: "Волосся", value: "hair" },
      ],
    },
    {
      name: "routineSize",
      type: "text",
      required: true,
    },
    {
      name: "sequences",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "steps",
          type: "array",
          fields: [
            {
              name: "number",
              type: "number",
              required: true,
            },
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
              required: true,
            },
            {
              name: "product",
              type: "relationship",
              relationTo: "products",
              required: false,
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
    },
    {
      name: "usageNotes",
      type: "text",
      hasMany: true,
    },
    {
      name: "relatedCollections",
      type: "relationship",
      relationTo: "collections",
      hasMany: true,
    },
  ],
};
