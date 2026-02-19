import React from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import contact from "../assets/contact.png";
import NewLetterBox from "../components/NewLetterBox";

function Contact() {
  return (
    <div className="lg:w-[98.8vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[80px] gap-[80px] pb-[30px] overflow-x-hidden">
      <Navbar />
      <div className="flex justify-center ">
        <Title text1={"Contact"} text2={"Us"} />
      </div>
      <div className="w-[100%] flex items-center justify-center flex-col lg:flex-row">
        <div className="lg:w-[50%] w-[100%] flex items-center justify-center ">
          <img
            src={contact}
            alt=""
            className="lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm"
          />
        </div>
        <div className="lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px] lg:pl-[100px]">
          <p className="lg:w-[80%] w-[100%] text-white font-bold lg:text-[18px] text-[15px]">
            Our Store
          </p>
          <p className="lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]">
            <p>12345 Random Station</p>
            <p>Random City, State, India</p>
          </p>
          <p className="lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]">
            <p>Tel: +91-9876543210</p> <p>Email: admin@onecart.com</p>
          </p>
          <p className="lg:w-[80%] w-[100%] text-white text-[15px] lg:text-[18px] mt-[10px] font-bold">Careers at OneCart </p>
          <p className="lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]">
            <p>Visit our careers page for current openings.</p>
          </p>
          <button className="px-[30px] py-[12px] flex items-center justify-center text-white bg-transparent border active:bg-slate-700 rounded-md">Explore Jobs</button>
        </div>
      </div>
      <NewLetterBox />
    </div>
  );
}

export default Contact;
