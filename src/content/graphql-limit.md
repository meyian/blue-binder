---
title: 'Getting limit to work on GraphQL'
date: '2020-08-09'
---

GraphQL is new to me. I don't know if this is something I'll need to master, or is it like Git, and you only need to remember a few recipes. I feel like it's the second case.

I needed a way to limit the number of posts I preview on the homepage, and there's something in ordinary SQL you can use to do that called `LIMIT`. I was sure there must be something similar in GraphQL but it took me a lot of googling to get here. A bunch of answers they gave me just didn't work. Ah well.

Here's what I did, for all the curious:

```
  query indexQuery($maxPostsOnIndex: Int) {
    allMarkdownRemark(limit: $maxPostsOnIndex, sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        ...
      }
    }
  }
```
