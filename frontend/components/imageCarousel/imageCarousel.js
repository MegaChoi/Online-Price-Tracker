'use client'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import placeholder from '@/public/assets/icons/placeholder.png'
import placeholder2 from '@/public/assets/icons/placeholder2.png'

const images = [
    {image: placeholder, alt:'a'},
    {image: placeholder2, alt:'a'},
]

export default function imageCarousel() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) => prevIndex < images.length - 1 ? prevIndex + 1 : 0 );
        }, 5000); 
    
        return () => clearInterval(interval);
      }, []);
    
    return (
    <div className=' relative w-full h-full rounded-[8px] overflow-hidden'>
        {images.map((image, index) => (
        <Image
            key={index}
            src={image.image}
            className={index === currentImageIndex ? '  h-full absolute object-contain top-0 left-0 z-[1] opacity-100' : ' h-full object-contain absolute top-0 left-0 z-[0] opacity-0'}
            alt={image.alt}
        />
        ))}
    </div>
    );
}
