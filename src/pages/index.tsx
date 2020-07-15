import * as React from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

const pageHtml = `
<h1 id="hello-world">Hello World</h1>
<p>I just posted about this on Twitter:</p>
<p>  Thanks to @arjithn&#39;s encouragement, I&#39;m doing the Gatsby 100 days challenge. This is my first 100 days challenge, public or private. Name and shame me if I don&#39;t post about it every day. Well, not that, maybe. But you know. Wish me luck, or something. #100DaysOfGatsby</p>
<p>Dear god, it&#39;s official now, isn&#39;t it? Just like my mission to also cut out processed sugar from my diet, I hope I can keep to it! My intention is to make notes on this blog daily, without taking too much time out of actual development work. So these posts are all going to be spontaneous, off-the-cuff, slightly random. Should be like a computer programmer&#39;s version of a doctor&#39;s note. Scratchy and messy, but all the ideas are there.</p>
<p>So I had to start up 4 different versions of Gatsby for things to eventually work the way I wanted it. Check the photo below. I thought working in TypeScript after picking a theme I liked would be easy. Just like a grown-up version of pressing lego bricks together to make a small stack. But themes aren&#39;t plug and play; to use a new theme you need to clone a whole repository from GitHub. You can&#39;t just, like, add a file, or copy over a folder. You have to clone a Github project, and that takes time. Not hating, but giving an example to explain where my time went.</p>
<p>In the end, I went with <code>gatsby-starter-typescript-plus</code> by @resir014. I&#39;ll have to build out the theme myself, but that&#39;s not a problem. It&#39;s part of the challenge. I think I&#39;ll publish this theme when I&#39;m done.</p>
<p><img src="https://res.cloudinary.com/dwrfod96z/image/upload/c_scale,w_627/v1594846177/Screenshot_2020-07-15_at_6.00.58_AM_kzzykp.png" alt="Screenshot of the numerous project folders I had to create"></p>
<p>I think I&#39;ll keep those extra folders I created and never delete them. Just like keeping a digital tears-of-blood tattoo. I&#39;m a thug, baby!</p>
`

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <div dangerouslySetInnerHTML={{ __html: pageHtml }} />
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
