import React from 'react'
import ImageCarousel from '@/components/imageCarousel/imageCarousel'
import SearchBar from '@/components/searchBar/searchBar'
import Link from 'next/link';
export default function Home() {
  return(
  <>
    <Link href="/items">Share Your Favorite Recipe</Link>
  </>
  )
}