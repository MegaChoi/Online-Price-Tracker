import React from 'react'
import ImageCarousel from '@/components/imageCarousel/imageCarousel'
export default function Home() {
  return(
  <>
    <header className='flex justify-center p-8'>
      <div className='w-[30rem] h-[25rem]'>
        <ImageCarousel/>
      </div>
      <div>
        <h1>nice</h1>
      </div>
    </header>
    <main>
      
    </main>
  </>
  )
}