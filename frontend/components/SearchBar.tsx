"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import React, {FormEvent, useState } from 'react'

// TODO: fix this method to check url from all sources not just amazon
const isValidProductURL = (url:string) => {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;

        // check if hostname contains amazon.com
        if(hostname.includes('amazon.com') 
        || hostname.includes('amazon.') 
        || hostname.endsWith('amazon')
        || hostname.includes('coles.com')
        || hostname.includes('woolworths.com')
        || hostname.includes('jbhifi.com')
        )
        {
            return hostname;
        }
        
    } catch (error) {
        return null;
    }

    return null;
}
const SearchBar = () => {
    const [searchPrompt, setsearchPrompt] = useState('');
    const [isloading, setIsloading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hostname = isValidProductURL(searchPrompt);

    if(!hostname) return alert('Please provide a valid link')
    

    try {
        setIsloading(true);
        const product = await scrapeAndStoreProduct(searchPrompt, hostname);
    } catch (error) {
        console.log(error)
    }finally {
        setIsloading(false);
    }
  }  

  return (
    <form 
        className='flex flex-wrap gap-4 mt-12'
        onSubmit={handleSubmit}
        >
        <input type="text" 
            value={searchPrompt}
            onChange={(e) => setsearchPrompt(e.target.value)}
            placeholder='Enter product link'
            className='searchbar-input'
        />    

        <button
            type='submit'
            className='searchbar-btn'
            disabled={searchPrompt === ''}
        >
        {isloading ? 'Searching...' : 'Search'}
        </button>
    </form>
  )
}

export default SearchBar