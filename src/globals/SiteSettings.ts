import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: { en: "Site Settings", uk: "Налаштування сайту" },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: { en: "Site name", uk: "Назва сайту" },
    },
    {
      name: "tagline",
      type: "text",
      required: true,
      label: { en: "Tagline", uk: "Слоган" },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: { en: "Description", uk: "Опис" },
    },
  ],
};
