import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Hero from "../components/Hero";
import Products from "./Products";
import OurPolicy from "../components/OurPolicy";
import NewLetterBox from "../components/NewLetterBox";
import Footer from "../components/Footer";

function Home() {
  const heroData = [
    {
      text1: (
        <>
          <span className="block sm:inline">Discover, collect, and</span>
        </>
      ),
      text2: (
        <>
          <span className="block sm:inline">sell extraordinary NFTs</span>
        </>
      ),
    },
    {
      text1: (
        <>
          <span className="block sm:inline">Digital art and</span>
        </>
      ),
      text2: (
        <>
          <span className="block sm:inline">collectibles</span>
        </>
      ),
    },
    {
      text1: (
        <>
          <span className="block sm:inline">Create, sell and</span>
        </>
      ),
      text2: (
        <>
          <span className="block sm:inline">collect your own NFTs</span>
        </>
      ),
    },
    {
      text1: (
        <>
          <span className="block sm:inline">The best place to</span>
        </>
      ),
      text2: (
        <>
          <span className="block sm:inline">buy and sell NFTs</span>
        </>
      ),
    },
  ];

  const [heroCount, setheroCount] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      setheroCount((prevCount) => (prevCount + 1) % heroData.length);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [heroData.length]);

  return (
    <div className="overflow-x-hidden relative top-[70px] sm:top-[60px]">
      <div className="w-[100vw] relative h-[100vh] sm:h-[50vh] md:h-[60vh] lg:h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]">
        <Navbar />
        <Background heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          setHeroCount={setheroCount}
          heroData={heroData[heroCount]}
        />
      </div>
      <Products />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  );
}

export default Home;
