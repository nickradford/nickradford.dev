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
    projects: collection({
      label: "Projects",
      path: "src/content/project/*",
      format: { contentField: "content" },
      slugField: "name",
      columns: ["name", "description"],
      entryLayout: "content",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        screenshots: fields.array(
          fields.image({
            label: "Screenshot",
            directory: "public/projects",
            publicPath: "/projects",
          }),
          {
            label: "Screenshots",
            itemLabel: (item) => (typeof item.value === "string" ? item.value : null) ?? "Screenshot",
          }
        ),
        publicUrl: fields.url({
          label: "Public URL",
          validation: { isRequired: false },
        }),
        githubUrl: fields.url({
          label: "GitHub URL",
          validation: { isRequired: false },
        }),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              directory: "public/projects",
              publicPath: "/projects",
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
            description: fields.text({
              label: "Description",
              description: "Don't add a period to the end.",
              validation: {
                pattern: {
                  regex: /^(?=.{10,40}$)(?!.*\.$).+$/,
                  message: "10-40 characters, without a final period",
                },
              },
            }),
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
          }
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
    projectOrder: singleton({
      label: "Project Order",
      path: "src/content/projectOrder/index",
      format: "json",
      schema: {
        slugs: fields.array(
          fields.relationship({
            label: "Project",
            collection: "projects",
          }),
          {
            label: "Projects",
            itemLabel: (item) => item.value ?? "Untitled project",
          }
        ),
      },
    }),
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
              description:
                "Enter username without @ (for example: nickradford).",
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
          }
        ),
      },
    }),
  },
});
