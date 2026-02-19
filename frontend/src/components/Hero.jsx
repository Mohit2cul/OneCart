import React from "react";
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    <div className="w-[60%] sm:w-[55%] md:w-[45%] lg:w-[40%] h-[100%] relative">
      <div className="absolute text-[#88d9ee] text-[14px] sm:text-[18px] md:text-[32px] lg:text-[45px] left-[5%] sm:left-[8%] md:left-[10%] lg:left-[10%] top-[5px] sm:top-[8px] md:top-[60px] lg:top-[90px]">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>
      <div className="absolute top-[80px] sm:top-[100px] md:top-[280px] lg:top-[400px] left-[5%] sm:left-[8%] md:left-[10%] lg:left-[10%] flex items-center justify-center gap-[8px] sm:gap-[10px]">
        <FaCircle
          className={`w-[10px] sm:w-[12px] md:w-[14px] lg:w-[14px] cursor-pointer ${
            heroCount === 0 ? "fill-orange-400" : "fill-white"
          } `}
          onClick={() => setHeroCount(0)}
        />
        <FaCircle
          className={`w-[10px] sm:w-[12px] md:w-[14px] lg:w-[14px] cursor-pointer ${
            heroCount === 1 ? "fill-orange-400" : "fill-white"
          } `}
          onClick={() => setHeroCount(1)}
        />
        <FaCircle
          className={`w-[10px] sm:w-[12px] md:w-[14px] lg:w-[14px] cursor-pointer ${
            heroCount === 2 ? "fill-orange-400" : "fill-white"
          } `}
          onClick={() => setHeroCount(2)}
        />
        <FaCircle
          className={`w-[10px] sm:w-[12px] md:w-[14px] lg:w-[14px] cursor-pointer ${
            heroCount === 3 ? "fill-orange-400" : "fill-white"
          } `}
          onClick={() => setHeroCount(3)}
        />
      </div>
    </div>
  );
}

export default Hero;
