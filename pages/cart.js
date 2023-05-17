import ButtonLink from '@/components/ButtonLink';
import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center';
import Header from '@/components/Header'
import PrimaryBtn from '@/components/PrimaryBtn';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr .7fr;
  gap: 30px;
  margin-top: 20px;
`;

const Box = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  with: fit-content;
`;

const Title = styled.h3`
  font-weight: bold;
  margin-bottom: 10px;
`;


//chat gpt code
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f2f2f2;
`;

const TableHeaderCell = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableDataCell = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100px;
  height: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const LineBreak = styled.div`
  width: 100%;
  height: 2px;
  background-color: black;
  border-radius: 1px solid black;
`;

const Total = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  outline: none;
  margin-bottom: 6px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const cart = () => {
  const {cartProduct,addToCart,removeProduct} = useContext(CartContext);
  const [products,setProducts] = useState([]);

  useEffect(()=>{
    if(cartProduct.length > 0) {
      axios.post('api/cart',{ids: cartProduct})
      .then(response =>{
        setProducts(response.data);
      })
    }
  },[cartProduct])

  const addProduct = (id)=>{
    addToCart(id);
  }

  const remove = (id)=>{
    removeProduct(id);
  }

  let total = 0;
  return (
    <>
    <Header/>
    <Center>
      <Wrapper>
        <Box>
          <h2>Cart</h2>
          {
            products.length > 0 &&
            <>
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Product</TableHeaderCell>
                  <TableHeaderCell>Quantity</TableHeaderCell>
                  <TableHeaderCell>Price</TableHeaderCell>
                </tr>
              </TableHeader>
              <tbody>
                {products.map(product=>(
                  <tr key={product._id}>
                  <TableDataCell>
                    <Image src={product.img[0]} alt="Product Image" />
                    {/* <p>{product.title}</p> */}
                  </TableDataCell>
                  <TableDataCell>
                    <ButtonWrapper>
                      <PrimaryBtn primary onClick={()=>remove(product._id)}>-</PrimaryBtn>
                      {cartProduct.filter(p=>p === product._id).length}
                      <PrimaryBtn primary onClick={()=>addProduct(product._id)}>+</PrimaryBtn>                      
                    </ButtonWrapper>

                  </TableDataCell>
                  <TableDataCell>{cartProduct.filter(p=>p === product._id).length * product.price}</TableDataCell>
                  {total += cartProduct.filter(p=>p === product._id).length * product.price }
                </tr>
              ))   
              }  
              </tbody>    
            </Table>
            <LineBreak/>
              <Total>
                <p>{total}</p>
              </Total>          
            </>

          }
          {
            !products.length && (
              <>
                Your cart is empty
              </>
            )
          }

        </Box>
        <Box>
          <Title>Order Information</Title>
          <Input type="text" placeholder='Name'/>
          <Input type="text" placeholder='Email'/>
          <CityHolder>
          <Input type="text" placeholder='City'/>
          <Input type="text" placeholder='Postal code'/>
          </CityHolder>
          <Input type="text" placeholder='Street Address'/>
          <Input type="text" placeholder='Country'/>
          <PrimaryBtn primary>Continue to Payment</PrimaryBtn>
        </Box>        
      </Wrapper>
    </Center>    
    </>

  )
}

export default cart