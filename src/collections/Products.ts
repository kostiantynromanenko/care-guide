import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: { en: "Product", uk: "Засіб" },
    plural: { en: "Products", uk: "Засоби" },
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
      name: "role",
      type: "text",
      required: true,
      label: { en: "Role in routine", uk: "Роль у рутині" },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: { en: "Description", uk: "Опис" },
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
      label: { en: "Tags", uk: "Теги" },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
      label: { en: "Image", uk: "Зображення" },
    },
    {
      name: "sourceUrl",
      type: "text",
      required: false,
      label: { en: "Official product page (Hillary)", uk: "Сторінка товару на офіційному сайті" },
      admin: {
        description: {
          en: "Real hillary.ua product page. Used as the outbound CTA link — not yet affiliate-tracked, see docs/PROJECT_CONTEXT.md.",
          uk: "Реальне посилання на hillary.ua. Використовується як кнопка переходу — поки без партнерського трекінгу.",
        },
      },
    },
    {
      name: "vendorCode",
      type: "text",
      required: false,
      label: { en: "Vendor code (Hillary catalog)", uk: "Артикул (каталог Hillary)" },
      admin: {
        description: {
          en: "Used to re-match this product against future catalog re-imports.",
          uk: "Потрібен для повторного зіставлення при наступних оновленнях каталогу.",
        },
      },
    },
    {
      name: "price",
      type: "number",
      required: false,
      label: { en: "Price, UAH (Hillary catalog, informational)", uk: "Ціна, грн (з каталогу Hillary, довідково)" },
      admin: {
        description: {
          en: "Not currently displayed on the public site — the catalog feed's price/availability data isn't reliably fresh (see docs/PROJECT_CONTEXT.md).",
          uk: "Поки не показується на сайті — дані з фіда не завжди актуальні.",
        },
      },
    },
    {
      name: "inStock",
      type: "checkbox",
      required: false,
      label: { en: "In stock (Hillary catalog, informational)", uk: "В наявності (з каталогу Hillary, довідково)" },
    },
  ],
};
