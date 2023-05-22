import Center from '@/components/Center'
import Header from '@/components/Header'
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import mongoose from 'mongoose';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 20px;
  margin-top: 40px;
`;

const Column = styled.div`
    background-color: white;
    padding: 30px;
`;

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const OptionalImgs = styled.div`
    display: flex;
    align-items: center;
`;

const Img = styled.img`
    width: 100px;
    height: 100px;
    cursor: pointer;
`;

const PrimaryImg = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: center;
    img{
      width: 200px;
    }
`;

const SelectWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
    width: 80%;
`;

const SelectBox = styled.select`
    padding: 6px;

`;

const PrimarySelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    gap: 10px;
`;

const SingleProductPage = ({product}) => {
  console.log(product);
  
  // useEffect(()=>{
  //   const fetchProduct = async()=>{
  //     const product = await Product.find({"_id": id});
  //     console.log(product);
  //   }

  //   fetchProduct()
  // },[id])

  const images = [
    "https://www.citypng.com/public/uploads/preview/iphone-14-pro-and-max-deep-purple-png-11662587434zacaxkb4sd.png",
    "https://freebiehive.com/wp-content/uploads/2022/09/Iphone-14-Pro-PNG-758x473.jpg",
    "https://firebasestorage.googleapis.com/v0/b/ecommerce-f135e.appspot.com/o/images%2Fdownload%20(9).jpg?alt=media&token=4ca0bf18-3255-4a84-b40b-8ac8b58a9fd5"

  ]

  const [primaryPhoto, setPrimaryPhoto] = useState("https://firebasestorage.googleapis.com/v0/b/ecommerce-f135e.appspot.com/o/images%2Fdownload%20(9).jpg?alt=media&token=4ca0bf18-3255-4a84-b40b-8ac8b58a9fd5");
  return (
    <>
      <Header />
      <Center>
        <ProductWrapper>
          <Column>
            <ImageWrapper>
              <PrimaryImg>
                <img src={product[0].img[0]}/>                
              </PrimaryImg>

              <OptionalImgs>
                {
                  product[0].img.map(img=>(
                    <Img src={img} key={img} onClick={()=>setPrimaryPhoto(img)}/>
                  ))
                }
              </OptionalImgs>
            </ImageWrapper>
          </Column>
          <Column>
                <h2>{product[0].title}</h2>
                <p>
                  Description: <br /><br/>
                  {product[0].description}
                </p><br />
                <h4>Specification</h4>
                <PrimarySelectWrapper>
                  <SelectWrapper>
                    <label for="ram">RAM</label>
                    <SelectBox id='ram'>
                      <option value="1">8GB</option>
                      <option value="2">16GB</option>
                    </SelectBox>
                  </SelectWrapper>
                  <SelectWrapper>
                    <label for="storage">Storage</label>
                    <SelectBox id='storage'>
                      <option value="1">64GB</option>
                      <option value="2">128</option>
                      <option value="2">256</option>
                    </SelectBox>
                  </SelectWrapper>
                  <SelectWrapper>
                    <label for="color">Color</label>
                    <SelectBox id='color'>
                      <option value="1">black</option>
                      <option value="2">red</option>
                      <option value="2">white</option>
                    </SelectBox>
                  </SelectWrapper>                      
                </PrimarySelectWrapper>
                <h2>{product[0].price}$</h2>
          </Column>
        </ProductWrapper>
      </Center>
    </>
    
  )
}

export default SingleProductPage

export async function getServerSideProps(context){
  await mongooseConnect();
  const {id} = context.query;

  const product = await Product.find({"_id": id});
  return {
      props: {
        product: JSON.parse(JSON.stringify(product))
      }
    }

}