import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from '@emotion/core'

import H1 from '../components/Heading1'
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

interface ArchivePageQueryProps {
  allMarkdownRemark: {
    totalCount: number
    edges: Edge[]
  }
}

interface ArchivePageProps {
  data: ArchivePageQueryProps
}

const centerPiece = (
  <div>
    <H1
      css={css`
        text-align: center;
      `}
    >
      Archive
    </H1>
  </div>
)

const ArchivePage = ({ data }: ArchivePageProps) => (
  <IndexLayout centerPiece={centerPiece}>
    <Page>
      <Container>
        <div>
          <h4>
            {data.allMarkdownRemark.totalCount} {data.allMarkdownRemark.totalCount === 1 ? `Post` : `Posts`}
          </h4>
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

export default ArchivePage
