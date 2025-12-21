import { config, fields, collection } from "@keystatic/core";

export default config({
  ui: {
    brand: { name: "Nick Radford (dot) dev" },
  },
  storage: {
    kind: "github",
    repo: "nickradford/nickradford.dev",
    branchPrefix: "post/",
  },
  collections: {
    project: collection({
      label: "Project",
      path: "src/content/project/*",
      format: { contentField: "content" },
      slugField: "title",
      columns: ["title", "url", "gitRepo"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description" }),
        url: fields.url({ label: "url" }),
        date: fields.date({ label: "Published Date" }),
        gitRepo: fields.url({ label: "gitRepo" }),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              directory: "public",
              publicPath: "/",
            },
          },
        }),
      },
    }),
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
        }),
      },
    }),
  },
});
