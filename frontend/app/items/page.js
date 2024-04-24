import React from 'react'
import { Suspense } from 'react';

async function Items() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
}

export default function ItemsPage() {
  
  return (
    <div>
        <Suspense fallback={<p>fetching</p>}>
            <Items/>
        </Suspense>
    </div>
  )
}

