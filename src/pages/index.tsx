import * as React from 'react'
import { Link, graphql } from 'gatsby'

import { css } from '@emotion/core'
// import Page from '../components/Page' #TODO: remove from repo
// import Container from '../components/Container'

import IndexLayout from '../layouts'
import Button from '../components/Button'
import H1 from '../components/Heading1'
import Paragraph from '../components/Paragraph'

interface Edge {
  node: {
    id: number
    excerpt: string
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      date: string
    }
  }
}

interface HomePageQueryProps {
  allMarkdownRemark: {
    totalCount: number
    edges: Edge[]
  }
}

interface HomePageProps {
  data: HomePageQueryProps
}

const indexHeader = (
  <div>
    <h1
      css={css`
        color: white;
        text-align: center;
      `}
    >
      100 Days of Gatsby
    </h1>
    <Paragraph>
      This is the blog site where I'll share my thoughts about what working with Gatsby for 100 days is like. Posts are in descending order
      of when I wrote them. I don't expect anyone to take these posts seriously, but if somehow you feel the urge to react about anything
      I've said, my Twitter handle is @hassanabudu and I'm very much all ears.
    </Paragraph>
    <div
      css={css`
        text-align: center;
      `}
    >
      <Button>Read More</Button>
    </div>
  </div>
)

const PostsText = (number: number) => `${number} ${number === 1 ? `Post` : `Posts`}`

const Index = ({ data }: HomePageProps) => (
  <div>
    <H1
      css={css`
        display: inline-block;
        border-bottom: 1px solid;
      `}
    >
      The Last {PostsText(data.allMarkdownRemark.edges.length)}
    </H1>
    {/* bookmark */}
    <h4>{PostsText(data.allMarkdownRemark.edges.length)}</h4>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div
        key={node.id}
        css={css`
          margin-bottom: 4rem;
        `}
      >
        <Link
          to={node.fields.slug}
          css={css`
            text-decoration: none;
            color: inherit;
          `}
        >
          <h3>
            {node.frontmatter.title}{' '}
            <span
              css={css`
                color: #bbb;
              `}
            >
              — {node.frontmatter.date}
            </span>
          </h3>
          <Paragraph>{node.excerpt}</Paragraph>
        </Link>
      </div>
    ))}
  </div>
)

const IndexPage = ({ data }: HomePageProps) => (
  <IndexLayout centerPiece={indexHeader}>
    <Index data={data} />
  </IndexLayout>
)

export const query = graphql`
  query indexQuery($maxPostsOnIndex: Int) {
    allMarkdownRemark(limit: $maxPostsOnIndex, sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
