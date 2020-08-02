import * as React from 'react'
import styled from '@emotion/styled'

const StyledButton = styled.button`
  background-color: #6dcff6;
  color: white;
  text-transform: uppercase;
  font-family: Helvetica, sans-serif;
  font-weight: 700;
  border: none;
  padding: 0.4em 1.5em;
  border-radius: 18px;

  &:hover {
    background-color: white;
    color: #6dcff6;
  }

  &:active {
    color: grey;
  }
`

interface ButtonProps {
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className }) => <StyledButton className={className}>{children}</StyledButton>

export default Button
