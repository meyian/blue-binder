import * as React from 'react'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import { useFormik } from 'formik'

import IndexLayout from '../layouts'
import { fonts } from '../styles/variables'

import H1 from '../components/Heading1'
import Page from '../components/Page'
import Container from '../components/Container'

interface Value {
  email?: string
}

interface AboutPageProps {
  data: {
    file: {
      childImageSharp: {
        fixed: any
      }
    }
  }
}

const validate = (values: Value) => {
  const errors: Value = {}

  if (!values.email) {
    errors.email = 'Email address is a required field'
  }

  return errors
}

const encode = (data: any) => {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

const setMessage = (message: string) => {
  const messageDiv = document.getElementById('messages')

  if (messageDiv) {
    messageDiv.innerText = message

    setTimeout(() => {
      messageDiv.innerText = ''
    }, 4000)
  }
}

const setError = (message: string) => {
  const messageDiv = document.getElementById('messages')

  if (messageDiv) {
    messageDiv.innerHTML = `<span style="color: darkred">${message}</div>`

    setTimeout(() => {
      messageDiv.innerText = ''
    }, 4000)
  }
}

const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate,
    onSubmit: values => {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'newsletter', ...values })
      })
        .then(() => setMessage('Thank you for signing up. Expect an email shortly.'))
        .catch(() => setError(`Unable to submit email to our cloud servers`))
    }
  })
  return (
    <form
      method="POST"
      name="newsletter"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={formik.handleSubmit}
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 3rem;
      `}
    >
      <div>
        <label
          htmlFor="email"
          css={css`
            margin-right: 0.5rem;
          `}
        >
          <span
            css={css`
              margin-right: 1rem;
            `}
          >
            Email Address
          </span>
          <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
        </label>
        <button type="submit">Submit</button>
        <div id="messages" />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </div>
    </form>
  )
}

const centerPiece = (
  <div>
    <H1
      css={css`
        text-align: center;
      `}
    >
      About
    </H1>
  </div>
)

const About = ({ data }: AboutPageProps) => (
  <IndexLayout centerPiece={centerPiece}>
    <Page>
      <Container>
        <p>This is a blog about three things, maybe.</p>
        <ol
          css={css`
            li {
              font-family: ${fonts.serif};
            }
          `}
        >
          <li>My 100-day journey with Gatsby</li>
          <li>Thoughts about the plainly-taken black tea that I drink as I code this</li>
          <li>Any other topic I want to write about and share</li>
        </ol>
        <p>
          I'm doing the 100DaysOfGatsby challenge, where I spend an hour each day working on Gatsby for 100 days. Creating this blog is one
          of the suggested challenges from the Gatsby team as part of this 100-day regime. for the . Another one the challenges was creating
          an about page on this blog with a black-and-white selfie on it. I'm so vain that I don't like any of my pictures, but they asked,
          so here's the selfie:
        </p>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-bottom: 2rem;
          `}
        >
          <Img alt="Picture of the author" fixed={data.file.childImageSharp.fixed} />
        </div>
        <p>
          That's me, not smiling at the camera. If you met me somewhere, that's what I'd look like before I pull the laser out and start
          blasting at the T-1000 behind you. In reality, it's the official photograph my workplace asked for.
        </p>
        <hr />
        <h2
          css={css`
            text-align: center;
            margin-top: 3rem;
            margin-bottom: 1rem;
          `}
        >
          Newsletter
        </h2>
        <p>
          If you sign up for the newsletter, I'll start writing and sending stuff. It'll probably be a digested version of whatever I find
          interesting from Newsletters I'm subscribed to, which cover technology and current affairs.
        </p>
        <SignupForm />
      </Container>
    </Page>
  </IndexLayout>
)

export default About

export const query = graphql`
  query {
    file(relativePath: { eq: "passport_selfie.jpeg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 250, height: 250, grayscale: true) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
