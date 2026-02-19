import React from "react";
import back1 from "../assets/back1.png"
import back2 from "../assets/back2.png"
import back3 from "../assets/back3.png"
import back4 from "../assets/back4.png"

function Background({ heroCount }) {
  if (heroCount === 0) {
    return <img src={back2} alt="" className="w-[50%] sm:w-[45%] md:w-[35%] lg:w-[30%] h-[60%] sm:h-[70%] md:h-[80%] lg:h-[90%] object-contain float-right overflow-auto pr-2 sm:pr-4 md:pr-8 lg:pr-20" />
  }
  else if (heroCount === 1) {
    return <img src={back1} alt="" className="w-[50%] sm:w-[45%] md:w-[35%] lg:w-[30%] h-[60%] sm:h-[70%] md:h-[80%] lg:h-[90%] object-contain float-right overflow-auto pr-2 sm:pr-4 md:pr-8 lg:pr-20" />
  }
  else if (heroCount === 2) {
    return <img src={back3} alt="" className="w-[50%] sm:w-[45%] md:w-[35%] lg:w-[30%] h-[60%] sm:h-[70%] md:h-[80%] lg:h-[90%] object-contain float-right overflow-auto pr-2 sm:pr-4 md:pr-8 lg:pr-20" />
  }
  else if (heroCount === 3) {
    return <img src={back4} alt="" className="w-[50%] sm:w-[45%] md:w-[35%] lg:w-[30%] h-[60%] sm:h-[70%] md:h-[80%] lg:h-[90%] object-contain float-right overflow-auto pr-2 sm:pr-4 md:pr-8 lg:pr-20" />
  }

}

export default Background;
