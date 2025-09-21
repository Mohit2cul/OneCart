import React from "react";
import Logo from "../assets/vcart logo.png";
import { BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { AiOutlineHome } from 'react-icons/ai';
import { IoIosContact } from 'react-icons/io';
import { FcAbout } from 'react-icons/fc';
import { MdOutlineCollections } from 'react-icons/md';

function Navbar() {
  let { userData, getCurrentUser } = useContext(userDataContext);
  let {serverUrl} = useContext(authDataContext)
  const [showSearch, setshowSearch] = useState(false);
  const [showProfile, setshowProfile] = useState(false);
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
        const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
        console.log(result);
        getCurrentUser();
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
      <div className="w-[30%] flex items-center justify-start gap-[10px]">
        <img className="w-[30px] h-[30px]" src={Logo} alt="" />
        <h1 className="text-[25px] font-semibold tracking-tight text-black">
          OneCart
        </h1>
      </div>
      <div className="w-[40%] hidden md:flex items-center justify-center">
        <ul className="flex items-center justify-center gap-[19px] text-white">
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl text-transform: uppercase" onClick={() => navigate("/")}>
            Home
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl text-transform: uppercase" onClick={() => navigate("/collections")}>
            Collections
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl text-transform: uppercase" onClick={() => navigate("/about")}>
            About
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl text-transform: uppercase" onClick={() => navigate("/contact")}>
            Contact
          </li>
        </ul>
      </div>
      <div className="w-[30%] flex items-center justify-end gap-[20px]">
        <BiSearch
          className="text-[25px] text-black cursor-pointer"
          onClick={() => setshowSearch(!showSearch)}
        />
        {!userData && (
          <CgProfile
            className="text-[25px] text-black cursor-pointer"
            onClick={() => setshowProfile(!showProfile)}
          />
        )}
        {userData && (
          <div className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center">
            {userData ?.name.slice(0, 1)}
          </div>
        )}
        <BsCart className="text-[25px] text-black cursor-pointer" />
        <p className="absolute w-[18px] h-[18px] items-center md:flex justify-center bg-black px-[5px] py-[2px] text-white rounded-full text-[9px] top-[10px] right-[23px] hidden">
          12
        </p>
      </div>
      {showSearch && (
        <div className="w-[90%] h-[80px] absolute top-[100%] left-0 right-0 flex items-center justify-center">
          <input
            type="text"
            className="w-[50%] h-[60%] border-[1px] border-[#dadada] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-white text-[18px]"
            placeholder="Search..."
          />
        </div>
      )}
      {showProfile && (
        <div className="absolute w-[220px] h-[200px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10">
          <ul className="w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-white">
            {!userData && (
              <li
                className="w-[100%] hover:bg-[#2f2f2f] py-[10px] px-[15px] cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  setshowProfile(false);
                }}
              >
                Login
              </li>
            )}
            {!userData && (
              <li
                className="w-[100%] hover:bg-[#2f2f2f] py-[10px] px-[15px] cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setshowProfile(false);
                  navigate("/login");
                }}
              >
                Logout
              </li>
            )}
            {!userData && (
              <li
                className="w-[100%] hover:bg-[#2f2f2f] py-[10px] px-[15px] cursor-pointer"
                onClick={() => {
                  navigate("/orders");
                  setshowProfile(false);
                }}
              >
                Orders
              </li>
            )}
            {!userData && (
              <li
                className="w-[100%] hover:bg-[#2f2f2f] py-[10px] px-[15px] cursor-pointer"
                onClick={() => {
                  navigate("/about");
                  setshowProfile(false);
                }}
              >
                About
              </li>
            )}
          </ul>
        </div>
      )}
      <div className="w-[100vw] h-[90px] flex items-center justify-between px-[20px] fixed bottom-0 left-0 bg-[#191818] md:hidden ">
        <button className="text-white flex items-center justify-center flex-col gap-[2px]">
          <AiOutlineHome className="w-[30px] h-[30px] text-white md:hidden" />
          Home
        </button>
        <button className="text-white flex items-center justify-center flex-col gap-[2px]">
          <MdOutlineCollections className="w-[30px] h-[30px] text-white md:hidden" />
          Collections
        </button>
        <button className="text-white flex items-center justify-center flex-col gap-[2px]">
          <FcAbout className="w-[30px] h-[30px] text-white md:hidden" />
          About
        </button>
        <button className="text-white flex items-center justify-center flex-col gap-[2px]">
          <IoIosContact className="w-[30px] h-[30px] text-white md:hidden" />
          Contact
        </button>
        
      </div>
    </div>
  );
}

export default Navbar;
