import React, { useContext } from 'react'
import styled from 'styled-components'
import CartIcon from './CartIcon';
import PrimaryBtn from './PrimaryBtn';
import { CartContext } from './CartContext';
import Link from 'next/link';

const Box = styled.div`
    background-color: white;
    padding: 15px 0px;
    display: flex;
    border-radius: 5px;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    margin: 10px 5px;
    img{
        max-width: 100%;
        max-height: 100px;
    }
`;

const ProductWrapper = styled(Link)`
    text-decoration: none;
    color: black;
`;

const DesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 5px;
    padding: 0px;
`;

const Title = styled.h3`
    font-size: 1rem;
    margin: 3px 3px;
    font-weight: normal;
    padding: 0;
`;

const Price = styled.span`
    font-size: 1rem;
    font-weight: bold;
    padding: 0px;
`;

const ProductBox = ({_id,title,img,price}) => {
    const {addToCart} = useContext(CartContext);
  return (
    <ProductWrapper href={`/product/${_id}`}>
        <Box>
            <img src={img ? img[0] : "https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"} alt="" />
        </Box>
        <Title>{title}</Title>
        
        <DesWrapper>
            <Price>{price && price}$</Price>
            
            <PrimaryBtn primary outline onClick={()=>addToCart(_id)}><CartIcon/></PrimaryBtn>
        </DesWrapper>
        
    </ProductWrapper>
    
  )
}

export default ProductBox