import React from 'react'
import styled, { css } from 'styled-components'

const Button = styled.button`
    
    padding: 10px;
    outline: none;
    color: white;
    border: none;
    border-radius: 3px;
    align-items: center;
    display: inline-flex;
    
    cursor: pointer;
    svg{
      height: 16px;
      margin-right: 5px;
    }
    ${prop=>prop.white && css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
  `}

    ${prop=>prop.primary && css`
      background-color: #5542F6;
    `}\

    ${prop=>prop.size === 'l' && css`
      font-size: 1.2rem;
      padding:10px 12px;
      svg{
        height: 20px;
      }
    `}
`;

const PrimaryBtn = ({children,...res}) => {
  return (
    <Button {...res}>{children}</Button>
  )
}

export default PrimaryBtn