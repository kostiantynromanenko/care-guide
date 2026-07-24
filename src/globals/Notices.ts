import type { GlobalConfig } from "payload";

export const Notices: GlobalConfig = {
  slug: "notices",
  label: { en: "Notices", uk: "Застереження" },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "affiliate",
      type: "textarea",
      required: true,
      label: { en: "Affiliate notice", uk: "Про партнерські посилання" },
    },
    {
      name: "independent",
      type: "textarea",
      required: true,
      label: { en: "Independence notice", uk: "Про незалежність сайту" },
    },
    {
      name: "medical",
      type: "textarea",
      required: true,
      label: { en: "Medical notice", uk: "Медичне застереження" },
    },
  ],
};
