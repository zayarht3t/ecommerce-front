const { default: styled } = require("styled-components");
import React, { useCallback, useContext } from 'react'
import Center from './Center';
import PrimaryBtn from './PrimaryBtn';
import ButtonLink from './ButtonLink';
import { CartContext } from './CartContext';
import { set } from 'mongoose';


const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 20px 0;
`;

const Title = styled.h1`
    font-weight: normal;
    margin: 0;
    font-size: 3rem;
`;

const Description = styled.p`
    color: #aaa;
    font-size: .9rem;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
    img {
        max-width: 100%;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`;

const Featured = ({product}) => {
    const {setCartProduct} = useContext(CartContext);
    const addFeaturedToCart = ()=>{
        console.log(product._id);
        setCartProduct(prev=>[...prev, product._id]);
    }
  return (
    <Bg>
        <Center>
            <Wrapper>
                <Column>
                    <Title>{product.title}</Title>
                    <Description>{product.description}</Description>
                    <ButtonWrapper >
                        <ButtonLink white={1} size='l' href={'/products/'+product._id}>Read More</ButtonLink>
                        <PrimaryBtn primary size='l' onClick={(product)=>addFeaturedToCart(product)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>

                            Add to Cart</PrimaryBtn>
                    </ButtonWrapper>  
                </Column>
                <Column>
                    <img src="https://firebasestorage.googleapis.com/v0/b/ecommerce-f135e.appspot.com/o/images%2Fkisspng-macbook-pro-15-4-inch-laptop-macbook-family-macbook-transparent-png-5a7539665fcb09.9811224815176318463924.png?alt=media&token=4ae4f62b-a850-4d15-8c79-334810030ef9" alt="" />
                </Column>
            </Wrapper>
            
        </Center>
    </Bg>
  )
}

export default Featured