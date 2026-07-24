import type { GlobalConfig } from "payload";

export const HowItWorks: GlobalConfig = {
  slug: "how-it-works",
  access: {
    read: () => true,
  },
  fields: [
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
      ],
    },
  ],
};
