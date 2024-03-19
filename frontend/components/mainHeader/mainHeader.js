import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/assets/icons/logo.png'
export default function mainHeader() {
  return (
    <header className='flex justify-between items-center px-40 py-8'>
        <Link href='/' className='flex items-center justify-center gap-8 font-bold font-sans text-2xl uppercase space'>
            <Image
                className=' w-[4rem] h-[4rem]'
                src={logo}
                alt='logo'
            />
            Price Spy
        </Link>
        <nav>

        </nav>
    </header>
  )
}

