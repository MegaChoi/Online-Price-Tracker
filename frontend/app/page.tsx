import React from 'react'
import Image from 'next/image'
import SearchBar from '@/components/SearchBar'
import HeroCarousel from '@/components/HeroCarousel'
import ProductCard from '@/components/ProductCard'
import { getAllProducts } from '@/lib/actions'
const Home = async () => {
  const allProducts = await getAllProducts();


  return (
    <>
      <section className='px-6 md:px-20 py-24 border-2 
      border-red-500
      '>
        <div className='flex max-xl:flex-col gap-16'>
          <div className='flex flex-col justify-center'>
            <p className='small-text'>
              Smart Shopping Starts Here:
              <Image
                src='/assets/icons/arrow-right.svg'
                alt='arrow-right'
                width={16}
                height={16}
              />
            </p>
            <h1 className='head-text'>
              Unleash the Power of 
              <span className='text-primary'> PriceWise</span>
            </h1>
            <p className='mt-6'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quia rerum odio atque saepe alias vero sed est nesciunt a dolore quis
              , dignissimos quisquam id nisi corrupti deserunt dolorum eveniet?
            </p>
            <SearchBar/>
          </div>
          <HeroCarousel/>

        </div>
      </section>
      <section className='trending-section'>
        <h2 className='section-text'>Trending</h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product = {product}/>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home