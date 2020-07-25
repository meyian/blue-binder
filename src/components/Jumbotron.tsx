import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { colors } from '../styles/variables'

/*

TODO

* Change the index around
* Do a Jumbotron experiment
* Move the jumbotron out

Aside

Don't bother me, I'm workin.

*/

const StyledHeader = styled.header`
  width: 100%;
  height: 80vh;
  background-color: ${colors.maya};
`

const StyledLink = styled(props => <Link {...props} />)`
  color: white;
  font-family: 'Noto Serif';
  font-style: italic;
  font-weight: 700;
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
    path: '/#about'
  },
  {
    name: 'Archive',
    path: '/archive'
  },
  {
    name: 'Contact Us',
    path: '/#about'
  }
]

const Panel: React.FC = () => {
  return (
    <div>
      <h1>100 Days of Gatsby</h1>
      <p>
        This is the blog site where I'll share my thoughts about what working with Gatsby for 100 days is like. Posts are in descending
        order of when I wrote them. I don't expect anyone to take these posts seriously, but if somehow you feel the urge to react about
        anything I've said, my Twitter handle is @hassanabudu and I'm very much all ears.
      </p>
    </div>
  )
}

const SuggestedMaterial: React.FC = () => {
  return (
    <div>
      <h2>Suggested Reading Material</h2>
      <p>
        If you're here, I truly respect your time, and as such, can't really recommend anything here. It's like I'm the waiter at your
        restaurant, trying to save you. But if you insist to sitting down for something here, I recommend the following posts:{' '}
      </p>
      <p>[none at the moment]</p>
    </div>
  )
}

const Jumbotron: React.FC = () => {
  const ul = (
    <ul
      css={css`
        float: right;
      `}
    >
      {navItems.map(({ name, path }) => (
        <StyledLink to={path}>{name}</StyledLink>
      ))}
    </ul>
  )

  return (
    <StyledHeader>
      <nav>{ul}</nav>
      <hr />
      <div css={css``}>
        <Panel />
      </div>
    </StyledHeader>
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
