import type { GlobalConfig } from "payload";

export const HowItWorks: GlobalConfig = {
  slug: "how-it-works",
  label: { en: "How It Works", uk: "Як це працює" },
  access: {
    read: () => true,
  },
  fields: [
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
          label: { en: "Title", uk: "Назва" },
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          label: { en: "Description", uk: "Опис" },
        },
      ],
    },
  ],
};
