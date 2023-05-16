import React from 'react'
import styled, { css } from 'styled-components'

export const ButtonStyle = css`
padding: 8px;
outline: none;
color: white;
border: none;
border-radius: 3px;
align-items: center;
display: inline-flex;
text-decoration: none;

cursor: pointer;
svg{
  height: 16px;
  margin-right: 3px;
}
${prop=>prop.white && css`
  background-color: transparent;
  color: #fff;
  border: 1px solid #fff;
`}

${prop=>prop.primary && !prop.outline && css`
  background-color: #5542F6;
`}

${prop=>prop.primary && prop.outline && css`
  background-color: transparent;
  border: 1px solid #5542F6;
  color: #5542F6;
`}

${prop=>prop.size === 'l' && css`
  font-size: 1.2rem;
  padding:10px 12px;
  svg{
    height: 20px;
  }
`}
`;

const Button = styled.button`
    ${ButtonStyle}
`;

const PrimaryBtn = ({children,...res}) => {
  return (
    <Button {...res}>{children}</Button>
  )
}

export default PrimaryBtn