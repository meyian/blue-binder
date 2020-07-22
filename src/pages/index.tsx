import * as React from 'react'
import { Link, graphql } from 'gatsby'

import { css } from '@emotion/core'
import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

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

const pageHtml = `
<h1>Mic check, 1, 2, 1, 2...</h1>
<p>This is the blog site where I'll share my thoughts about what working with Gatsby for 100 days is like. Posts are in descending order of
when I wrote them. I don't expect anyone to take these posts seriously, but if somehow you feel the urge to react about anything I've said,
my Twitter handle is @hassanabudu and I'm very much all ears.</p>
`

const IndexPage = ({ data }: HomePageProps) => (
  <IndexLayout>
    <Page>
      <Container>
        <p
          css={css`
            font-family: 'Noto Serif';
            font-style: italic;
            font-weight: bold;
          `}
        >
          Almost before - Noto Serif italic
        </p>
        <p
          css={css`
            font-family: 'Helvetica';
            font-weight: 400;
          `}
        >
          Almost before - Helvetica
        </p>
        <p
          css={css`
            font-family: 'Droid Serif';
          `}
        >
          Almost before - Droid Serif
        </p>

        <div dangerouslySetInnerHTML={{ __html: pageHtml }} />
        <div>
          <h1
            css={css`
              display: inline-block;
              border-bottom: 1px solid;
            `}
          >
            Index
          </h1>
          <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id}>
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
                <p>{node.excerpt}</p>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Page>
  </IndexLayout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
