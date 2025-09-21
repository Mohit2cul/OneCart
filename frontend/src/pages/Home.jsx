import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Hero from "../components/Hero";

function Home() {
  let heroData = [
    {
      text1: "Discover, collect, and",
      text2: "sell extraordinary NFTs",
    },
    {
      text1: "Digital art and",
      text2: "collectibles",
    },
    {
      text1: "Create, sell and",
      text2: "collect your own NFTs",
    },
    {
      text1: "The best place to",
      text2: "buy and sell NFTs",
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
    <div className="overflow-x-hidden relative top-[70px] ">
      <div className="w-[100vw] fixed lg:h-[100vh] md:h-[100vh] sm:h-[40vh] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]">
        <Navbar />
        <Background heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          setHeroCount={setheroCount}
          heroData={heroData[heroCount]}
        />
      </div>
    </div>
  );
}

export default Home;
