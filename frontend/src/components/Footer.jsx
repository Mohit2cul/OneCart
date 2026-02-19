import React from "react";
import logo from "../assets/vcart logo.png";

function Footer() {
  return (
    <div className="w-[100%] md:h-[36vh] h-[21vh] mb-[77px] md:mb-[0px] ">
      <div className="w-[100%] md:h-[30vh] h-[15vh] md:mb-[0px] bg-[#dbfcfcec] flex items-center justify-center md:px-[50px] px-[5px] ">
        <div className="md:w-[25%] w-[35%] h-[100%] flex items-start justify-center flex-col gap-[5px] ">
          <div className="flex justify-start gap-[5px] mt-[10px] md:mt-[40px]">
            <img
              src={logo}
              alt=""
              className="md:w-[40px] md:h-[40px] w-[30px] h-[30px]"
            />
            <p className="text-[19px] md:text-[20px]  font-semibold text-black">
              OneCart
            </p>
          </div>
          <p className="text-[15px] text-[#1e2223] hidden md:block">
            OneCart offers a wide range of products at unbeatable prices.
          </p>
          <p className="text-[15px] text-[#1e2223] md:hidden flex">
            Fast, Easy and Secure Shopping
          </p>
        </div>
        <div className="md:w-[30%] w-[40%] h-[100%] flex items-center justify-center flex-col text-center ">
          <div className="flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px] ">
            <p className="text-[19px] md:text-[20px] text-[#1e2223] font-semibold">
              Company
            </p>
          </div>
          <ul>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              Home
            </li>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              About us
            </li>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              Delivery
            </li>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className="w-[25%] h-[100%] flex items-center justify-center flex-col text-center">
          <div className="flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px] ">
            <p className="text-[19px] md:text-[20px] text-[#1e2223] font-semibold">
              Get in touch
            </p>
          </div>
          <ul>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              +91 8989889899
            </li>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              contact@onecart.com
            </li>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              +123, Some Street, Some City, Country
            </li>
            <li className="text-[15px] text-[#1e2223] hidden md:block cursor-pointer">
              Mon - Fri: 9:00 - 18:00
            </li>
          </ul>
        </div>
      </div>
      <div className="w-[100%] h-[1px] bg-slate-400"></div>
      <div className="w-[100%] h-[5vh] bg-[#dbfcfcec] flex items-center justify-center">Copyright 2025@onecart.com-All Rights Reserved</div>
    </div>
  );
}

export default Footer;
