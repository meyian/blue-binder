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
    errors.email = 'Required'
  }

  return errors
}

const HiddenForm = () => {
  return (
    <form name="contact" netlify netlify-honeypot="bot-field" hidden>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message" />
    </form>
  )
}

const encode = data => {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
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
      console.log('SignupForm > values')
      console.log(values)

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...values })
      })
        .then(() => alert('Success!'))
        .catch(error => alert(error))
    }
  })
  return (
    <form
      method="POST"
      name="contact"
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
          Email Address
        </label>
        <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
        <button type="submit">Submit</button>
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </div>
    </form>
  )
}

class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '', email: '', message: '' }
  }

  /* Here’s the juicy bit for posting the form submission */

  handleSubmit = e => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'newsletter', ...this.state })
    })
      .then(() => alert('Success!'))
      .catch(error => alert(error))

    e.preventDefault()
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { name, email, message } = this.state
    return (
      <form method="POST" name="newsletter" data-netlify="true" netlify-honeypot="bot-field" onSubmit={this.handleSubmit}>
        <p>
          <label>
            Your Name: <input type="text" name="name" value={name} onChange={this.handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your Email: <input type="email" name="email" value={email} onChange={this.handleChange} />
          </label>
        </p>
        <p>
          <label>
            Message: <textarea name="message" value={message} onChange={this.handleChange} />
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    )
  }
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
        <HiddenForm />
        <p>This is a blog about three things, maybe.</p>
        <ol
          css={css`
            li {
              font-family: ${fonts.serif};
            }
          `}
        >
          <li>My 100-day journey with Gatsby</li>
          <li>Thoughts about the plainly-taken tea I drink as I make this</li>
          <li>Any other topic I want to write about and share</li>
        </ol>
        <p>
          I'm spending 100 hours daAs part the challenges the Gatsby team suggested as course material for these 100 days. Another one the
          tasks in these challenges was that I create an about page with a black-and-white selfie on it. I'm so vain that I don't like any
          of my pictures, but they asked, so here's the selfie:
        </p>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-bottom: 2rem;
          `}
        >
          <Img fixed={data.file.childImageSharp.fixed} />
        </div>
        <p>
          That's me, not smiling at the camera. If you met me somewhere, that's what I'd look like before I pull the laser out and start
          blasting at the T-1000 behind you.
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
        <ContactForm />
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
