import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollections() {

    let { products } = useContext(shopDataContext)
    let[latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        console.log("LatestCollections - Products received:", products);
        console.log("LatestCollections - Products length:", products?.length);
        console.log("LatestCollections - Is array?", Array.isArray(products));
        
        if (products && Array.isArray(products) && products.length > 0) {
            setLatestProducts(products.slice(0,8))
            // console.log("LatestCollections - Latest products set:", products.slice(0,4));
        } else {
            console.log("LatestCollections - No products to display");
        }
    }, [products])
  return (
    <div>
        <div className='h-[8%] w-[100%] text-center md:mt-[50px]'>
        <Title text1="Latest" text2="Collections" />
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>Discover the latest trends in digital art and collectibles.</p>
        </div>
        <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
            {latestProducts && latestProducts.length > 0 ? (
                latestProducts.map((item, index) => {
                    console.log("Rendering card for:", item);
                    return <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price} />
                })
            ) : (
                <div className='text-white text-center'>
                    <p>No products found</p>
                    <p className='text-sm text-gray-400'>Products in context: {products?.length || 0}</p>
                    <p className='text-sm text-gray-400'>Latest products: {latestProducts?.length || 0}</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default LatestCollections