import * as React from 'react'
import { css } from '@emotion/core'

import IndexLayout from '../layouts'
import H1 from '../components/Heading1'
import Paragraph from '../components/Paragraph'

const suggestedHeaderContent = (
  <div>
    <H1
      css={css`
        text-align: center;
      `}
    >
      Suggested Reading Material
    </H1>
  </div>
)

const suggestedPageContent: JSX.Element = (
  <div>
    <Paragraph>
      I'm sorry, there's really nothing here I can suggest to you at the moment. I mean, you're free to pick something from the &nbsp;
      <a href="/archive">archive</a> to read, but don't blame me if you read something, and then you're bored and then annoyed that your
      time was wasted. As for myself, if the writing here were printed, I wouldn't even use it as toilet paper. I'll be that frank, on
      behalf of your valuable time.
    </Paragraph>
    <Paragraph>
      Okay, well I've heard stories about what you can get away with as toilet paper, so maybe my writing isn't that bad. But if you feel
      that tug leading you away from this tab and towards something else on the internet, please, by all means follow it. In fact, now would
      actually be a good time to close this tab.
    </Paragraph>
  </div>
)

const SuggestedPage: React.FC = () => <IndexLayout centerPiece={suggestedHeaderContent}>{suggestedPageContent}</IndexLayout>

export default SuggestedPage
