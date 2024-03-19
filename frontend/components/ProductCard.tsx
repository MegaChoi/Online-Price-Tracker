import React, {useState} from 'react'
import {Product} from '@/types';
import Link from 'next/link'
import Image from 'next/image';
interface Props{
    product: Product;
}
interface DomainLogoMap {
  [key: string]: string;
}

const ProductCard = ({product} : Props) => {
  const [note, setNote] = useState('')
  const [noteIsVisbile, setNoteIsVisible] = useState(false)

  const handleNoteChange = (event) => {
    event.preventDefault();
    setNote(event.target.value)
  }

  function showNoteArea () {
    setNoteIsVisible(true)
  }

  const domainLogoMap: DomainLogoMap = {
    'Coles': '/assets/images/Coles_logo.jpg',
    'Woolworths': '/assets/images/Woolworths_logo.jpg',
    'JBHIFI':'/assets/images/JBHIFI_logo.jpg'
  };

  const logoSrc = domainLogoMap[product.category];

  const priceChange = () => {
    const priceDifference = product.originalPrice - product.currentPrice;
    const priceChange = priceDifference / product.originalPrice * 100


    if (priceDifference === 0) {
      return <p></p>;
    } else if (priceDifference < 0) {
      return <span className='bg-red-400 rounded-md'>   ↑ {priceChange.toFixed(2)}%</span>;
    } else {
      return <span className=' bg-green-400 rounded-md'>↓ {Math.abs(priceChange).toFixed(2)}%</span>;
    }
  };

  return (
    // <Link href={`products/${product.id}`} className="product-card border shadow hover:shadow-xl">
    <div className="product-card border shadow hover:shadow-xl" >
        {/* main image */}
        <div className='product-card_img-container'>
            <Image
            src={product.imageURL.replace('//www.', 'https://www.')}
            alt={product.title}
            width={200}
            height={200}
            className="product-card_img"
            />
        </div>
        
        {/* price tag */}
        <div className='pl-4'>
            <p className='text-2xl font-semibold inline pr-2'>${product.currentPrice}</p>
            {priceChange()}
            {product.currentPrice === product.originalPrice ?  '' : <p className='text-sm line-through'>${product.originalPrice}</p>}
            
        </div>

        {/* description */}
        <div>
          <p className='pl-4'> {product.title} </p>
        </div>
        

        {/* add notes area*/}
        <div className='flex justify-center items-center '>
          {noteIsVisbile ? 
            <input 
              className='border'
              type="text" 
              onChange={handleNoteChange} 
              value={note} />
            :
            <Image
              src={'/assets/icons/editIcon.png'}
              alt={product.title}
              width={20}
              height={20}
              onClick={showNoteArea}
          />
          }

        </div>


        {/* Brand logo */}
        <Link href={product.url}>
          <div className="overflow-hidden m-4">
            <Image
                src={logoSrc}
                width={100}
                height={100}
                alt='f'
              />
          </div>
        </Link>
    </div>
    // </Link>
  )
}
  
export default ProductCard