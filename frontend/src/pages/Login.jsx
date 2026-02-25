import React, { useContext, useState } from "react";
import Logo from "../assets/vcart logo.png";
import google from "../assets/google.png.webp";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { auth, provider } from "../../utils/Firebase.js";
import { signInWithPopup } from "firebase/auth";
import { userDataContext } from "../context/UserContext.jsx";

function Login() {
  const [show, setshow] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();
  let { getCurrentUser, userData } = useContext(userDataContext);

  // Redirect to home if already logged in
  React.useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Login successful:", result.data);
      // Clear form fields
      setemail("");
      setpassword("");
      setusername("");
      // Refresh user data
      await getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log("Login error:", error);
      setErrorMsg(error.response?.data?.message || "Login failed. Please try again.");
    }
  };
  const googleLogin = async () => {
    try {
      console.log("Starting Google login...");
      console.log("Server URL:", serverUrl);
      
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      console.log("Google user selected:", email);
      
      console.log("Sending login request to:", serverUrl + "/api/auth/googleLogin");
      const result = await axios.post(
        serverUrl + "/api/auth/googleLogin",
        {
          name,
          email,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Google login successful:", result.data);
      // Clear form fields
      setemail("");
      setpassword("");
      setusername("");
      // Refresh user data
      await getCurrentUser();
      navigate("/");
    } catch (error) {
      console.error("Google login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code,
      });
      if(error.code === "auth/popup-blocked") {
        setErrorMsg("Google login popup was blocked. Please allow popups and try again.");
      } else if(error.code === "auth/unauthorized-domain") {
        setErrorMsg("Unauthorized domain. Please add your domain to Firebase authorized domains.");
      } else if(error.response) {
        setErrorMsg(error.response?.data?.message || "Google login failed. Please try again.");
      } else if(error.message === "Network Error") {
        setErrorMsg("Cannot connect to server. Please check your internet connection and try again.");
      } else {
        setErrorMsg("Google login failed: " + error.message);
      }
    }
  };

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
        <span className="text-[white] text-[24px] font-semibold">Login</span>
        <span className="text-[white] text-[16px] mb-4">
          Welcome to OneCart, Place your order now.
        </span>
      </div>
      <div className="max-w-[450px] w-[90%] h-[600px] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center bg-[#00000025] rounded-[10px] mb-8">
        <form
          onSubmit={handleLogin}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[15px]"
          action=""
        >
          {errorMsg && (
            <div className="w-full text-center text-red-500 bg-red-100 rounded p-2 mb-2">
              {errorMsg}
            </div>
          )}
          <div
            className="w-[90%] h-[50px] bg-[#45656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer hover:bg-[#2e4d52]"
            onClick={googleLogin}
          >
            <img
              src={google}
              className="ml-2 w-[30px] bg-auto h-[30px] rounded-full"
              alt=""
            />{" "}
            Login with Google
          </div>
          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>
          <div className="relative w-[90%] h-[380px] flex flex-col items-center justify-center gap-[15px]">
            <input
              type="text"
              className="w-full h-[50px] bg-[#45656cae] rounded-lg px-4"
              placeholder="UserName"
              onChange={(e) => setusername(e.target.value)}
              value={username}
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
                className="w-[25px] h-[25px] cursor-pointer absolute right-4 top-[50%]"
                onClick={() => setshow(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="w-[25px] h-[25px] cursor-pointer absolute right-4 top-[50%]"
                onClick={() => setshow(true)}
              />
            )}
            <button className="w-full h-[50px] bg-[#6060f5] rounded-lg cursor-pointer hover:bg-[#4545f1] text-[white] font-semibold">
              Login
            </button>
            <p className="text-[white]">
              Don't have an account?{"  "}
              <span
                className="text-[#6060f5] cursor-pointer mb-10"
                onClick={() => navigate("/signup")}
              >
                Create Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
