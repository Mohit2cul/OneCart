import React, { useContext, useState } from "react";
import Logo from "../assets/vcart logo.png";
import { useNavigate } from "react-router-dom";
import google from "../assets/google.png.webp";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/UserContext";

function Register() {
  const [show, setshow] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      getCurrentUser();
      navigate("/");
      console.log(result.data);
      // Optionally redirect or show success
    } catch (error) {
      console.log(error);
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      const result = await axios.post(serverUrl + "/api/auth/googleLogin", {
        name,
        email
      },{
        withCredentials: true
      })
      console.log(result.data);
      getCurrentUser();
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start pt-2">
      <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px]">
        <img
          className="w-[40px] h-[40px] cursor-pointer"
          src={Logo}
          alt=""
          onClick={() => navigate("/")}
        />
        <h1
          className="text-[white] text-[24px] font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          OneCart
        </h1>
      </div>
      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[white] text-[24px] font-semibold">Register</span>
        <span className="text-[white] text-[16px] mb-4">
          Welcome to OneCart, Place your order now.
        </span>
      </div>
      <div className="max-w-[450px] w-[90%] h-[600px] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center bg-[#00000025] rounded-[10px] mb-8">
        <form
          onSubmit={handleSignup}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[15px]"
          action=""
        >
          <div className="w-[90%] h-[50px] bg-[#45656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer" onClick={googleSignup}>
            <img
              src={google}
              className="ml-2 w-[30px] bg-auto h-[30px] rounded-full"
              alt=""
            />{" "}
            Register with Google
          </div>
          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>
          <div className="relative w-[90%] h-[350px] flex flex-col items-center justify-center gap-[15px]">
            <input
              type="text"
              className="w-full h-[50px] bg-[#45656cae] rounded-lg px-4"
              placeholder="UserName"
              required
              onChange={(e) => setname(e.target.value)}
              value={name}
            />
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
                className="w-[25px] h-[25px] cursor-pointer absolute right-4 top-1/2"
                onClick={() => setshow(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="w-[25px] h-[25px] cursor-pointer absolute right-4 top-1/2"
                onClick={() => setshow(true)}
              />
            )}
            <button className="w-full h-[50px] bg-[#6060f5] rounded-lg cursor-pointer hover:bg-[#4545f1] text-[white] font-semibold">
              Create Account
            </button>
            <p className="text-[white]">
              Already have an account?{"  "}
              <span
                className="text-[#6060f5] cursor-pointer mb-10"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
