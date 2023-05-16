import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Featured from '@/components/Featured'
import { Product } from '@/models/Product'
import { mongooseConnect } from '@/lib/mongoose'
import Productlist from '@/components/Productlist'

const inter = Inter({ subsets: ['latin'] })

export default function Home({product,newProducts}) {
  return (
    <div>
      <Header/>
      <Featured product={product}/> 
      <Productlist newProducts={newProducts}/>
    </div>

  )
}

export async function getServerSideProps(){
  await mongooseConnect();
  const productId = "6457af7e5490fbce4aaf12d8"
  const product = await Product.findById(productId);
  const newProducts = await Product.find().sort({'_id': -1}).limit(10);
  return {
    props: {product: JSON.parse(JSON.stringify(product)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
      
    }
  }
}
