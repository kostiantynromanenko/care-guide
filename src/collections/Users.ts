import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: { en: "User", uk: "Користувач" },
    plural: { en: "Users", uk: "Користувачі" },
  },
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [],
};
