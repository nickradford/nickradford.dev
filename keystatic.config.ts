import { config, fields, collection, singleton } from "@keystatic/core";
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
      columns: ["draft", "title", "date", "lastUpdated"],
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        draft: fields.checkbox({ label: "Draft" }),
        date: fields.date({ label: "Published Date" }),
        lastUpdated: fields.date({
          label: "Last Updated",
          defaultValue: { kind: "today" },
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (p) => p.value,
        }),
        changelog: fields.array(
          fields.object({
            description: fields.text({ label: "Description" }),
            date: fields.date({
              label: "Date",
              defaultValue: { kind: "today" },
            }),
          }),
          {
            label: "Changelog",
            description: "Rendered as <Changelog />",
            itemLabel: (change) =>
              `${change.fields.date.value} - ${change.fields.description.value}`,
          },
        ),
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
  singletons: {
    inspoLinks: singleton({
      label: "Inspo Links",
      path: "src/content/inspoLinks/index",
      format: "json",
      schema: {
        links: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            url: fields.url({ label: "URL" }),
            authorName: fields.text({ label: "Author Name" }),
            twitterUsername: fields.text({
              label: "Twitter Username",
              description: "Enter username without @ (for example: nickradford).",
            }),
            imageUrl: fields.url({
              label: "Image URL",
              validation: { isRequired: false },
            }),
            notes: fields.text({
              label: "Notes",
              description: "Why this link is inspirational to you.",
              multiline: true,
              validation: { isRequired: false },
            }),
          }),
          {
            label: "Links",
            itemLabel: (item) => {
              const title = item.fields.title.value?.trim();
              const url = item.fields.url.value?.trim();
              if (title && url) return `${title} — ${url}`;
              if (title) return title;
              if (url) return url;
              return "Untitled link";
            },
          },
        ),
      },
    }),
  },
});
