import React, { useState } from "react";
import Logo from "../assets/vcart logo.png";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext.jsx";
import { adminDataContext } from "../context/AdminContext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  let [show, setshow] = useState(false);
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let { serverUrl } = useContext(authDataContext);
  let {adminData, getAdmin} = useContext(adminDataContext);
  let navigate = useNavigate();

  const adminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/adminLogin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }        
      );
      console.log(result.data);
      getAdmin();
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start pt-2">
      <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px]">
        <img className="w-[40px] h-[40px] cursor-pointer" src={Logo} alt="" />
        <h1 className="text-[white] text-[24px] font-bold cursor-pointer">
          OneCart
        </h1>
      </div>
      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[white] text-[24px] font-semibold">
          Admin Login
        </span>
        <span className="text-[white] text-[16px] mb-4">
          Welcome to OneCart, Apply to admin login.
        </span>
      </div>
      <div className="max-w-[450px] w-[90%] h-[600px] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center bg-[#00000025] rounded-[10px] mb-8">
        <form
          onSubmit={adminLogin}
          className="w-[80%] h-[80%] flex flex-col items-center justify-start gap-[15px]"
          action=""
        >
          <div className="relative w-[90%] h-[350px] flex flex-col items-center justify-center gap-[25px]">
            <input
              type="email"
              className="w-full h-[50px] bg-[#45656cae] rounded-lg px-4"
              placeholder="Email"
              required
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
            <input
              type={show ? "text" : "password"}
              className="w-full h-[50px] bg-[#45656cae] rounded-lg px-4"
              placeholder="Password"
              required
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
            {show ? (
              <AiOutlineEye
                className="w-[25px] h-[25px] cursor-pointer absolute right-4 top-[41%]"
                onClick={() => setshow(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="w-[25px] h-[25px] cursor-pointer absolute right-4 top-[41%]"
                onClick={() => setshow(true)}
              />
            )}
            <button className="w-full h-[50px] bg-[#6060f5] rounded-lg cursor-pointer hover:bg-[#4545f1] text-[white] font-semibold mt-10">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

