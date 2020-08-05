import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link, StaticQuery, graphql } from 'gatsby'
import { colors } from '../styles/variables'

/*

TODO

* Change the index around
* Do a Jumbotron experiment
* Move the jumbotron out

Aside

"Don't bother me, I'm workin."

*/

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
        width: 500px;
        opacity: ${opacity};
      `}
    >
      {centerPiece}
    </div>
  )
}

// const SuggestedMaterial: React.FC = () => {
//   return (
//     <div>
//       <h2>Suggested Reading Material</h2>
//       <p>
//         If you're here, I truly respect your time, and as such, can't really recommend anything here. It's like I'm the waiter at your
//         restaurant, trying to save you. But if you insist to sitting down for something here, I recommend the following posts:{' '}
//       </p>
//       <p>[none at the moment]</p>
//     </div>
//   )
// }

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
            list-decoration: none;
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
          <Header>
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
                `}
              >
                {ul}
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
                height: calc(100% - 2rem); /* TODO: 2rem to a variable */
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

/*

Todo
+ menu links render
= links flush to the right
* gap between links
* Blue Binder text
* line under links
* centered panel for intro messge
* done
(* index)

*/
