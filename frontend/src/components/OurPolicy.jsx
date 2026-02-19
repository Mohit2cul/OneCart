import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
return (
    <div className="w-full min-h-screen md:min-h-[70vh] flex flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025] gap-12 py-10">
        <div className="w-full text-center mt-20">
            <Title text1={"Our"} text2={"Policy"} />
            <p className="w-full mx-auto text-xs md:text-base px-2 text-blue-100">
                Customer-Friendly Policies - Commited to Your Satisfaction and Safety.
            </p>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center flex-wrap gap-8 md:gap-5 px-2">
            <div className="w-full sm:w-[400px] max-w-[95vw] flex flex-col items-center justify-center gap-2 py-6 bg-white/5 rounded-lg shadow-md">
                <RiExchangeFundsLine className="w-8 h-8 md:w-12 md:h-12 text-[#90b9ff]" />
                <p className="font-semibold text-base md:text-lg text-[#a5e8f7]">Easy Exchange Policy</p>
                <p className="font-semibold text-xs md:text-sm text-[aliceblue] text-center">Exchange Made Easy - Quick and Customer Friendly Process.</p>
            </div>
            <div className="w-full sm:w-[400px] max-w-[95vw] flex flex-col items-center justify-center gap-2 py-6 bg-white/5 rounded-lg shadow-md">
                <TbRosetteDiscountCheckFilled className="w-8 h-8 md:w-12 md:h-12 text-[#90b9ff]" />
                <p className="font-semibold text-base md:text-lg text-[#a5e8f7]">7 Days Return Policy</p>
                <p className="font-semibold text-xs md:text-sm text-[aliceblue] text-center">7 Days Easy Return - Hassle-Free Process.</p>
            </div>
            <div className="w-full sm:w-[400px] max-w-[95vw] flex flex-col items-center justify-center gap-2 py-6 bg-white/5 rounded-lg shadow-md">
                <BiSupport className="w-8 h-8 md:w-12 md:h-12 text-[#90b9ff]" />
                <p className="font-semibold text-base md:text-lg text-[#a5e8f7]">Customer Support</p>
                <p className="font-semibold text-xs md:text-sm text-[aliceblue] text-center">We're here to help - 24/7 Customer Support.</p>
            </div>
        </div>
    </div>
)
}

export default OurPolicy