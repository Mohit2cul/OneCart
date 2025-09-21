import React from "react";
import back1 from "../assets/back1.png"
import back2 from "../assets/back2.png"
import back3 from "../assets/back3.png"
import back4 from "../assets/back4.png"

function Background({ heroCount }) {
  if (heroCount === 0) {
    return <img src={back2} alt="" className="lg:pr-20 w-[30%] h-[90%] object-contain float-right overflow-auto" />
  }
  else if (heroCount === 1) {
    return <img src={back1} alt="" className="lg:pr-20 w-[30%] h-[90%] object-contain float-right overflow-auto" />
  }
  else if (heroCount === 2) {
    return <img src={back3} alt="" className="pr-20 w-[30%] h-[90%] object-contain float-right overflow-auto" />
  }
  else if (heroCount === 3) {
    return <img src={back4} alt="" className="pr-20 w-[30%] h-[90%] object-contain float-right overflow-auto" />
  }

}

export default Background;
