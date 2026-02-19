import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {

    const {currency, delivery_fee, getCartAmount } = useContext(shopDataContext)

  return (

    <div className='w-full lg:ml-[30px]'>
        <div className='text-xl py-[10px] '>
            <Title text1={"Cart"} text2={"Totals"} />
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm text-[#f3f9fc] p-[30px] border-[1px] border-[#4d8890]'>
            <p>Subtotal </p>
            <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between text-white text-[18px] p-[10px] '>
            <p>Shipping Fee</p>
            <p>{currency} {delivery_fee !== undefined && delivery_fee !== null ? delivery_fee : 0}.00</p>
        </div>
        <hr />
        <div className='flex justify-between text-white text-[18px] p-[10px]'>
            <b>
                Total
            </b>
            <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + (delivery_fee !== undefined && delivery_fee !== null ? delivery_fee : 0)}.00</b>
        </div>
    </div>
  )
}

export default CartTotal