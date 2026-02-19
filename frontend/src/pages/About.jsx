import React from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import about from "../assets/about.png";
import NewLetterBox from "../components/NewLetterBox";

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[80px] overflow-x-hidden">
      <Navbar />
      <div className="flex justify-center">
        <Title text1={"About"} text2={"Us"} />
      </div>
      <div className="w-full flex items-center justify-center flex-col lg:flex-row flex-1 gap-[50px]">
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img
            src={about}
            alt=""
            className="lg:w-[65%] w-[80%] shadow-md shadow-black rounded-lg"
          />
        </div>
        <div className="lg:w-1/2 w-[90%] flex items-start justify-center flex-col mt-[20px] gap-[20px] lg:mt-0 pr-[50px]">
          <p className="w-full text-white md:text-[16px] text-[13px]">
            Welcome to OneCart, your number one source for all things product.
            We're dedicated to providing you the very best of products, with an
            emphasis on quality, customer service, and uniqueness.
          </p>
          <p className="w-full text-white md:text-[16px] text-[13px]">
            Founded in 2025 by Kshitij, OneCart has come a long way from its
            beginnings in a small office. When Mohit first started out, his
            passion for eco-friendly products drove him to start his own
            business.
          </p>
          <p className="w-full text-white text-[15px] lg:text-[18px] mt-[10px] font-bold">
            Our Mission
          </p>
          <p className="w-full text-white md:text-[16px] text-[13px]">
            Our mission is to make it easy for our customers to find and
            purchase high-quality products that meet their needs and exceed
            their expectations. We believe that shopping should be a fun and
            enjoyable experience, and we're committed to providing our customers
            with the best possible service.
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center flex-col gap-[10px] mt-[50px] sm:mt-[80px] mb-[60px]">
        <Title text1={"Why"} text2={"Choose Us?"} />
        <div className="w-[90%] flex items-center justify-center lg:flex-row flex-col py-[40px]">
          <div className="lg:w-1/3 w-full h-[220px] border border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b] ">
            <b className="text-[20px] font-semibold text-[#bff1f9] ">
              Quality Assurance
            </b>
            <p className="flex items-center justify-center w-[100%] text-center">
              We ensure that all products meet our high standards before they
              reach you.
            </p>
          </div>
          <div className="lg:w-1/3 w-full h-[220px] border border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b] ">
            <b className="text-[20px] font-semibold text-[#bff1f9] ">
              Convenience
            </b>
            <p className="flex items-center justify-center w-[100%] text-center">
              Our user-friendly website and mobile app make shopping easy and
              convenient.
            </p>
          </div>
          <div className="lg:w-1/3 w-full h-[220px] border border-gray-100 flex items-center justify-center gap-[10px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b] ">
            <b className="text-[20px] font-semibold text-[#bff1f9] ">
              Customer Service
            </b>
            <p className="flex items-center justify-center w-[100%] text-center">
              We go above and beyond to ensure our customers are satisfied with
              their shopping experience.
            </p>
          </div>
        </div>
      </div>
      <NewLetterBox />
    </div>
  );
}

export default About;
