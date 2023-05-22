import Center from '@/components/Center'
import Header from '@/components/Header'
import Productlist from '@/components/Productlist'
import { mongooseConnect } from '@/lib/mongoose'
import { Product } from '@/models/Product'
import React from 'react'

const AllProductsPage = ({newProducts}) => {
  return (
    <>
    <Header/>
    <Center>
        <h1 style={{paddingLeft: 30}}>All Products</h1>
        <Productlist newProducts={newProducts}/>
    </Center>
    </>
  )
}

export default AllProductsPage


export async function getServerSideProps(){
    const newProducts = await Product.find().sort({'_id': -1}).limit(10);
    return {
      props: {
              newProducts: JSON.parse(JSON.stringify(newProducts)),
        
      }
    }
  }
  