import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client'

import { IBannerData } from '../types/bannerData'
import { IProduct } from '../types/product'

interface HomeProps {
  products: IProduct[]
  bannerData: IBannerData[]
}

function Home({ products, bannerData }: HomeProps) {

  useEffect(() => {
    console.log('products', products)
    console.log('bannerData', bannerData)  })

  return (
    <>
      <HeroBanner 
        heroBanner={bannerData[0]} 
      />

      <div className='products-heading'>
        <h2> Best Selling Products </h2>
        <p> Speakers of many variations </p>
      </div>

      <div className='products-container'>
        {products?.map(
          product => <Product key={product._id} product={product} />
        )}
      </div>

      <FooterBanner footerBanner={bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type ==  "product"]'
  const products = await client.fetch(query)

  const bannerQuery = '*[_type ==  "banner"]'
  const bannerData = await client.fetch(bannerQuery)


  return {
    props: { products, bannerData }
  }
}


export default Home

