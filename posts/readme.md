# How to write a post

1. Start with the frontmatter

```
---
title: The title of the article
date: "2022-04-12" // must be a string for now
draft?: true // if you don't want it to show on the site
---
```

2. Then write the post, seperate the excerpt from the rest of the content with

```mdx
{/* excerpt */}
```

## Example

```mdx
---
title: How to train your dragon
date: "2022-01-04"
draft: true
---

"How to Train Your Dragon" is a wonderful childrens film from 2010, telling the adventure of so and so. In this article I will...

{/* excerpt */}

... the rest of the post
```
