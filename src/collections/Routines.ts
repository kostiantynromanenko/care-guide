import type { CollectionConfig } from "payload";

/**
 * A "Routine" is a use-case/schedule-based guide (ranok/vechir/minimal/weekly
 * — see docs/SITE_STRUCTURE.md §5–6), distinct from a "Collection" (a
 * concern/need-based bundle, docs/SITE_STRUCTURE.md §3–4). The two
 * deliberately reference the same real Products — a routine is just a
 * different, editorial lens on the same catalog, not a separate set of SKUs.
 */
export const Routines: CollectionConfig = {
  slug: "routines",
  labels: {
    singular: { en: "Routine", uk: "Рутина" },
    plural: { en: "Routines", uk: "Рутини" },
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
      name: "summary",
      type: "textarea",
      required: true,
      label: { en: "Summary (card + intro)", uk: "Короткий опис (для картки та вступу)" },
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
      label: { en: "Tags", uk: "Теги" },
    },
    {
      name: "area",
      type: "select",
      required: true,
      label: { en: "Area", uk: "Область догляду" },
      options: [
        { label: "Обличчя", value: "face" },
        { label: "Волосся", value: "hair" },
      ],
    },
    {
      name: "steps",
      type: "array",
      required: true,
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
      label: {
        en: "Related collections (for a more tailored routine)",
        uk: "Пов'язані добірки (для точнішого підбору)",
      },
    },
  ],
};
