import React from 'react'
import LatestCollections from '../components/LatestCollections'
import BestSeller from '../components/BestSeller'

function Products() {
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] py-[20px] text-white flex flex-col items-center justify-start'>
      <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col'>
        <LatestCollections />
      </div>
            <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col'>
        <BestSeller />
      </div>
    </div>
  )
}

export default Products