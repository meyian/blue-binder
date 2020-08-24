import * as React from 'react'
import { graphql } from 'gatsby'

import { css } from '@emotion/core'

import Img from 'gatsby-image'
import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

interface PageTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    markdownRemark: {
      html: string
      excerpt: string
      frontmatter: {
        title: string
        featuredImage: {
          childImageSharp: {
            fluid: any
          }
        }
      }
    }
  }
}

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => {
  const post = data.markdownRemark
  const featuredImgFluid = post.frontmatter.featuredImage && post.frontmatter.featuredImage.childImageSharp.fluid

  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>{post.frontmatter.title}</h1>
          <Img
            css={css`
              margin-bottom: 2rem;
            `}
            fluid={featuredImgFluid}
          />
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default PageTemplate

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
