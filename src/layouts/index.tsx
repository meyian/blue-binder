import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize'
import '../styles/normalize'

import { css } from '@emotion/core'
import styled from '@emotion/styled'
import LayoutRoot from '../components/LayoutRoot'
import Jumbotron from '../components/Jumbotron'
import LayoutMain from '../components/LayoutMain'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
}

interface PanelProps {
  children?: JSX.Element[] | JSX.Element
  hasCenterPiece: boolean
}

interface SectionProps {
  hasCenterPiece: boolean
}

const StyledSection = styled.section`
  position: relative;
  top: ${(props: SectionProps) => (props.hasCenterPiece ? `100vh` : `150px`)}; /* TODO: move this into a variable */
  background-color: #f8f8f8;
`

const Panel = ({ children, hasCenterPiece }: PanelProps) => (
  <StyledSection hasCenterPiece={hasCenterPiece}>
    <div
      css={css`
        position: relative;
        bottom: 50px; /* TODO: move this into a variable */
        left: 50px;
        width: calc(100% - 100px);
        background-color: white;
        padding: 5rem;
        border-radius: 60px;
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
  </StyledSection>
)

interface IndexLayoutProps {
  centerPiece?: JSX.Element[] | JSX.Element | string
  children?: JSX.Element[] | JSX.Element
}

const IndexLayout = ({ children, centerPiece }: IndexLayoutProps) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => {
      const [opacity, setOpacity] = useState(1)

      document.addEventListener('scroll', () => {
        const { scrollTop } = document.documentElement
        setOpacity(1 - scrollTop / window.innerHeight)
      })

      return (
        <LayoutRoot>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: data.site.siteMetadata.description },
              { name: 'keywords', content: data.site.siteMetadata.keywords }
            ]}
          />
          <LayoutMain>
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
                <Jumbotron centerPiece={centerPiece} centerPieceOpacity={opacity} />
              </div>
              <Panel hasCenterPiece={!!centerPiece}>{children}</Panel>
            </div>
          </LayoutMain>
        </LayoutRoot>
      )
    }}
  />
)

export default IndexLayout
