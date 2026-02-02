import {
  config,
  fields,
  collection,
  type LocalConfig,
  type GitHubConfig,
  singleton,
} from "@keystatic/core";

type StorageType = LocalConfig["storage"] | GitHubConfig["storage"];

const storage: StorageType = import.meta.env.DEV
  ? {
      kind: "local",
    }
  : {
      kind: "github",
      repo: "nickradford/nickradford.dev",
      branchPrefix: "keystatic/",
    };

export default config({
  ui: {
    brand: { name: "Nick Radford (dot) dev" },
  },
  storage: storage,
  singletons: {
    projects: singleton({
      label: "Project Order",
      path: "src/content/projects",
      schema: {
        order: fields.array(
          fields.relationship({
            label: "Project",
            collection: "project",
          }),
          {
            itemLabel: (props) => props.value,
          },
        ),
      },
    }),
  },
  collections: {
    project: collection({
      label: "Project",
      path: "src/content/project/*",
      format: { contentField: "content" },
      slugField: "title",
      columns: ["title", "url", "gitRepo"],
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        url: fields.url({ label: "url" }),
        showUrl: fields.checkbox({ label: "Show URL?", defaultValue: true }),
        date: fields.date({ label: "Published Date" }),
        gitRepo: fields.text({
          label: "gitRepo",
          defaultValue: "https://github.com/nickradford",
          validation: {
            pattern: {
              regex: /^https:\/\/github\.com\//,
              message: "Must be a Github URL",
            },
          },
        }),
        showGitRepo: fields.checkbox({
          label: "Display GitHub Link?",
          defaultValue: true,
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
