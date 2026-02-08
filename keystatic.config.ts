import { config, fields, collection } from "@keystatic/core";
import { ImageGallery } from "src/components/mdx/ImageGallery.keystatic";

export default config({
  ui: {
    brand: { name: "Nick Radford (dot) dev" },
  },
  storage:
    import.meta.env.NODE_ENV === "PRODUCTION"
      ? {
          kind: "github",
          repo: "nickradford/nickradford.dev",
          branchPrefix: "post/",
        }
      : {
          kind: "local",
        },
  collections: {
    blog: collection({
      label: "Blog",
      path: "src/content/blog/*",
      format: { contentField: "content" },
      slugField: "title",
      columns: ["draft", "title", "date"],
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        draft: fields.checkbox({ label: "Draft" }),
        date: fields.date({ label: "Published Date" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (p) => p.value,
        }),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              directory: "public",
              publicPath: "/",
            },
          },
          components: { ImageGallery },
        }),
      },
    }),
  },
});
