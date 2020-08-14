import React, { useState } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { math } from 'polished'

import 'modern-normalize'
import '../styles/normalize'

import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colors, dimensions } from '../styles/variables'
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
  top: ${(props: SectionProps) => (props.hasCenterPiece ? `100vh` : dimensions.heights.panelMarginTop)};
  background-color: #f8f8f8;
`

const StyledPanelDiv = styled.div`
  position: relative;
  bottom: ${dimensions.heights.panelOffset};
  left: ${dimensions.heights.panelOffset};
  width: calc(100% - ${math(`${dimensions.heights.panelOffset.toString()} * 2`)});
  background-color: white;
  padding: 5rem;
  border-radius: 60px;
  -webkit-box-shadow: 0 30px 50px 0 rgba(1, 1, 1, 0.15);
  box-shadow: 0 30px 50px 0 rgba(1, 1, 1, 0.15);

  & h1 {
    color: ${colors.electric};
    text-decoration: none;
    text-align: center;
    border: none;
    width: 100%;
    margin-bottom: 2rem;
  }

  & pre {
    background-color: aliceblue;
    overflow: scroll;
  }

  & p {
    font-family: 'Georgia', san-serif;
  }
`

const Panel = ({ children, hasCenterPiece }: PanelProps) => (
  <StyledSection hasCenterPiece={hasCenterPiece}>
    <StyledPanelDiv>{children}</StyledPanelDiv>
    <div
      css={css`
        height: 100px;
        text-align: center;
      `}
    >
      <div>
        <h4
          css={css`
            color: lightblue;
            margin-bottom: 0;
          `}
        >
          Blue Binder
        </h4>
        <span
          css={css`
            color: gray;
          `}
        >
          Created by{' '}
        </span>
        <a
          css={css`
            color: black;
          `}
          target="_blank"
          rel="noopener noreferrer"
          href="http://hassanabudu.com/"
        >
          Hassan Abudu
        </a>
      </div>
      <p
        css={css`
          color: gray;
        `}
      >
        &copy; {new Date().getFullYear()}
      </p>
    </div>
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

      try {
        document.addEventListener('scroll', () => {
          const { scrollTop } = document.documentElement
          setOpacity(1 - scrollTop / window.innerHeight)
        })
      } catch (e) {
        console.log(e)
      }

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
