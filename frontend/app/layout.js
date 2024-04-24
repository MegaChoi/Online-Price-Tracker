import MainHeader from '../components/mainHeader/mainHeader';
import './globals.css'
import ImageCarousel from '@/components/imageCarousel/imageCarousel'
import SearchBar from '@/components/searchBar/searchBar'
export const metadata = {
  title: 'Pricewise',
  description: 'Track product prices effortlessly and save money on your online shopping.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
          <MainHeader/>
          <header className='flex justify-center p-2'>
            <div className='w-[10rem] h-[10rem]'>
              <ImageCarousel/>
            </div>
            <div>

            </div>
          </header>
          <main>
            <div className='flex justify-center'>
              <SearchBar/>
            </div>
          </main>
          {children}
      </body>
    </html>
  );
}
