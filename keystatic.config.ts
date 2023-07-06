import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      schema: {
        title: fields.text({ label: "Title" }),
      },
    }),
  },
});
