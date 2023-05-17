import React from 'react'
import styled from 'styled-components'
import ProductBox from './ProductBox';

const ProductWrapper = styled.div`
    
    padding: 20px 50px;
    

`;

const ProductList = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr ;
    gap: 30px;
`;

const Title = styled.h2`
    font-weight: bold;
    margin: 0 auto;
`;

const TitleWrapper = styled.div`
    max-width: 800px;
`;
const Productlist = ({newProducts}) => {
  return (
    <ProductWrapper>
        <TitleWrapper>
            <Title>New Arrivals</Title>
        </TitleWrapper>
        <ProductList>
        {newProducts?.length > 0 &&
            newProducts.map((product) =>(
                <ProductBox {...product} key={product._id}/>
            ))
        }            
        </ProductList>

    </ProductWrapper>
  )
}

export default Productlist