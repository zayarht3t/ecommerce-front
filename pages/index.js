import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Featured from '@/components/Featured'
import { Product } from '@/models/Product'
import { mongooseConnect } from '@/lib/mongoose'

const inter = Inter({ subsets: ['latin'] })

export default function Home({products}) {
  console.log(products);
  return (
    <div>
      <Header/>
      <Featured/>  
    </div>

  )
}

export async function getServerSideProps(){
  await mongooseConnect();
  const productId = "6457af7e5490fbce4aaf12d8"
  const products = await Product.findById(productId);
  return {
    props: {products: JSON.parse(JSON.stringify(products))}
  }
}
