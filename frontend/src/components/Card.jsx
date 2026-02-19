import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({name, image, id, price}) {

    let { currency } = useContext(shopDataContext)
    let navigate = useNavigate();

  return (
    <div className='w-[250px] max-w-[90%] h-[360px] max-h-[500px] bg-[#ffffff0a] backdrop:blur-lg rounded-lg hover:scale-[105%] flex items-start justify-start flex-col p-[10px] cursor-pointer border-[1px] border-[#80808049]' onClick={() => navigate(`/product-details/${id}`)}>

    <img src={image} alt="" className='w-[100%] h-[75%] object-cover overflow-hidden rounded-sm' />
    <div className='text-[#c3f6fa] text-[18px] py-[20px] '>{name}</div>
    <div className='text-[#f3f3fa] text-[14px]'>{currency}{price}</div>
    </div>
  )
}

export default Card