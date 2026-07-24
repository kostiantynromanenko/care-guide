import type { GlobalConfig } from "payload";

export const Notices: GlobalConfig = {
  slug: "notices",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "affiliate",
      type: "textarea",
      required: true,
    },
    {
      name: "independent",
      type: "textarea",
      required: true,
    },
    {
      name: "medical",
      type: "textarea",
      required: true,
    },
  ],
};
