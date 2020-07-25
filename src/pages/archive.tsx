import * as React from 'react'
import { Link } from 'gatsby'
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

const ArchivePage = ({ data }: HomePageProps) => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>Here are all the articles</h1>
        <div>
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

export default ArchivePage
