'use client'
import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import Image from 'next/image'

const heroImages = [
    { imgUrl : '/assets/images/hero-1.svg', alt:'1'},
    { imgUrl : '/assets/images/hero-2.svg', alt:'2'},
    { imgUrl : '/assets/images/hero-3.svg', alt:'3'},
    { imgUrl : '/assets/images/hero-4.svg', alt:'4'},
    { imgUrl : '/assets/images/hero-5.svg', alt:'5'}
]

const HeroCarousel = ({onClose}) => {
  return (
    <div className='hero-carousel' onClick={onClose}>
        <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={2000}
            showArrows={false}
            showStatus={false}
        >
            {heroImages.map((image) => (
                <Image
                    key={image.alt}
                    src={image.imgUrl}
                    alt={image.alt}
                    width={480}
                    height={480}
                    className='object-contain'
                />
            ))}
        </Carousel>
        <Image
            src='assets/icons/hand-drawn-arrow.svg'
            alt='arrow'
            width={175}
            height={175}
            className='max-xl:hidden absolute -left-[15%] bottom-0 z-0'
        />
    </div>
  )
}

export default HeroCarousel