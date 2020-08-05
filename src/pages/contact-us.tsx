import * as React from 'react'

import { css } from '@emotion/core'
// import Page from '../components/Page' #TODO: remove from repo
// import Container from '../components/Container'

import IndexLayout from '../layouts'
import H1 from '../components/Heading1'

const contactUsHeaderContent = (
  <div>
    <H1
      css={css`
        color: white;
        text-align: center;
      `}
    >
      Contact Us
    </H1>
  </div>
)

interface SocialMediaSite {
  src: string
  site: string
}

const socialMediaSites: SocialMediaSite[] = [
  { src: 'https://twitter.com/hassanabudu', site: 'Twitter' },
  { src: 'https://www.instagram.com/meyian86/', site: 'Instagram' },
  { src: 'mailto:meyian@gmail.com', site: 'Email' }
]

const contactUsPageContent: JSX.Element = (
  <div>
    <p>Reach out to us here:</p>
    <ul>
      {socialMediaSites.map(x => (
        <li>
          <a href={x.src}>{x.site}</a> {/* TODO: Use Gatsby link */}
        </li>
      ))}
    </ul>
  </div>
)

const ContactUsPage: React.FC = () => <IndexLayout centerPiece={contactUsHeaderContent}>{contactUsPageContent}</IndexLayout>

export default ContactUsPage
