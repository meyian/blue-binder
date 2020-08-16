import React, { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link, StaticQuery, graphql } from 'gatsby'
import { colors, dimensions } from '../styles/variables'

const StyledHeader = styled.header`
  width: 100%;
  height: 100vh;
  color: white;
  background-color: ${colors.maya};
`

const StyledHeaderNoPanel = styled(StyledHeader)`
  height: 50vh;
`

const StyledLink = styled(props => <Link {...props} />)`
  color: white;
  font-family: 'Noto Serif';
  font-style: italic;
  font-weight: 700;
  margin-right: 0.5rem;
  transition: 0.15s;
  padding: 0 0.5rem;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 5px 28px 67px -24px rgba(0, 0, 0, 0.49);
    color: ${colors.maya};
    text-decoration: none;
  }
`

interface NavItem {
  name: string
  path: string
}

const navItems: NavItem[] = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Suggested',
    path: '/suggested'
  },
  {
    name: 'Archive',
    path: '/archive'
  },
  {
    name: 'Contact Us',
    path: '/contact-us'
  }
]

interface PanelProps {
  centerPiece?: JSX.Element[] | JSX.Element | string
  opacity?: number
}

const Panel = ({ centerPiece, opacity }: PanelProps) => {
  return (
    <div
      css={css`
        max-width: 500px;
        opacity: ${opacity};
        padding: 10px;
      `}
    >
      {centerPiece}
    </div>
  )
}

interface JumbotronProps {
  centerPiece?: JSX.Element[] | JSX.Element | string
  centerPieceOpacity: number
}

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
}

const Jumbotron = ({ centerPiece, centerPieceOpacity }: JumbotronProps) => {
  const ul = (
    <ul
      css={css`
        float: right;
        margin: 0;
      `}
    >
      {navItems.map(({ name, path }) => (
        <li
          css={css`
            display: inline-block;
            list-style: none;
          `}
        >
          <StyledLink key={path} to={path}>
            {name}
          </StyledLink>
        </li>
      ))}
    </ul>
  )

  const Header = centerPiece ? StyledHeader : StyledHeaderNoPanel

  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <StaticQuery
      query={graphql`
        query JumbotronQuery {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={(data: StaticQueryProps) => {
        return (
          <Header onClick={() => setMenuVisible(false)}>
            <div
              css={css`
                width: 100vw;
                height: 2rem;
                flex-direction: row;
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <span
                css={css`
                  margin-left: 0.7rem;
                  font-family: 'Roboto Slab', serif;
                  font-weight: 700;
                `}
              >
                {data.site.siteMetadata.title}
              </span>
              <nav
                css={css`
                  display: inline-block;
                  .desktop {
                    display: block;
                  }

                  .mobile {
                    display: none;
                  }

                  @media (max-width: 730px) {
                    & .desktop {
                      display: none;
                    }
                    & .mobile {
                      display: block;
                    }
                  }
                `}
              >
                <div className="desktop">{ul}</div>
                <div className="mobile">
                  <button
                    type="button"
                    css={css`
                      background-color: transparent;
                      border: none;
                      color: white;
                      position: relative;
                      right: 10px;
                    `}
                    onClick={event => {
                      event.stopPropagation()
                      setMenuVisible(!menuVisible)
                    }}
                  >
                    MENU
                  </button>
                  <div
                    css={css`
                      position: absolute;
                      right: 10px;
                      background-color: white;
                      z-index: 100;
                      display: ${menuVisible ? 'block' : 'none'};
                      border-radius: 5px;
                      padding: 10px;
                    `}
                  >
                    {navItems.map(({ name, path }) => (
                      <li
                        css={css`
                          list-style: none;
                          padding: 0;
                          margin: 0;
                        `}
                      >
                        <StyledLink
                          css={css`
                            padding: 0;
                            margin: 0;
                            color: gray;
                          `}
                          key={path}
                          to={path}
                        >
                          {name}
                        </StyledLink>
                      </li>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
            <hr
              css={css`
                padding: 0;
                margin: 0;
                border: 2px solid #6dcff6;
              `}
            />
            <div
              css={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                height: calc(100% - ${dimensions.heights.taskbar});
              `}
            >
              <Panel opacity={centerPieceOpacity} centerPiece={centerPiece} />
            </div>
          </Header>
        )
      }}
    />
  )
}

export default Jumbotron
