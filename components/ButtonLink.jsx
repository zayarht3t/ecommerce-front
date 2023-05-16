import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { ButtonStyle } from './PrimaryBtn';

const StyleLink = styled(Link)`
    ${ButtonStyle}

`;

const ButtonLink = (props) => {


  return (
    <StyleLink {...props}/>
  )
}

export default ButtonLink