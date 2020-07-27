import * as React from 'react'
import { Link, graphql } from 'gatsby'

import { css } from '@emotion/core'
// import Page from '../components/Page' #TODO: remove from repo
// import Container from '../components/Container'
import Jumbotron from '../components/Jumbotron'
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

interface PanelProps {
  children?: JSX.Element[] | JSX.Element
}

const pageHtml = `
<h1>Mic check, 1, 2, 1, 2...</h1>
<p>This is the blog site where I'll share my thoughts about what working with Gatsby for 100 days is like. Posts are in descending order of
when I wrote them. I don't expect anyone to take these posts seriously, but if somehow you feel the urge to react about anything I've said,
my Twitter handle is @hassanabudu and I'm very much all ears.</p>
`

const Index = ({ data }: HomePageProps) => (
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
)

const Panel = ({ children }: PanelProps) => (
  <section
    css={css`
      position: relative;
      top: 100vh;
      background-color: #f8f8f8;
    `}
  >
    <div
      css={css`
        position: relative;
        bottom: 50px; /* TODO: move this into a variable */
        left: 50px;
        width: calc(100% - 100px);
        background-color: white;
        padding: 5rem;
        -webkit-box-shadow: 0 30px 50px 0 rgba(1, 1, 1, 0.15);
        box-shadow: 0 30px 50px 0 rgba(1, 1, 1, 0.15);
      `}
    >
      {children}
    </div>
    <div
      css={css`
        height: 100px;
      `}
    />
  </section>
)

const IndexPage = ({ data }: HomePageProps) => (
  <IndexLayout>
    <div
      css={css`
        position: relative;
      `}
    >
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
        `}
      >
        <Jumbotron />
      </div>
      <Panel>
        <Index data={data} />
      </Panel>
    </div>
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
