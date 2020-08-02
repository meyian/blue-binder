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
  margin-right: 2rem;
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
    name: 'About',
    path: '/about'
  },
  {
    name: 'Archive',
    path: '/archive'
  },
  {
    name: 'Contact Us',
    path: '/contact'
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

/*

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

*/

const Jumbotron = ({ centerPiece, centerPieceOpacity }: JumbotronProps) => {
  const ul = (
    <ul
      css={css`
        float: right;
        margin: 0;
      `}
    >
      {navItems.map(({ name, path }) => (
        <StyledLink key={path} to={path}>
          {name}
        </StyledLink>
      ))}
    </ul>
  )

  const Header = centerPiece ? StyledHeader : StyledHeaderNoPanel
  console.table({ centerPieceOpacity })

  return (
    <Header>
      <nav
        css={css`
          display: inline-block;
          width: 100vw;
          padding-top: 0.3rem;
        `}
      >
        {ul}
      </nav>
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
