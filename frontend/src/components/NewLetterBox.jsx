import React, { useState } from "react";

function NewLetterBox() {
  let [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed Successfully");
    setEmail("");
  };

  return (
    <div className="w-[100%] h-[40vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col gap-[10px]">
      <p className="md:text-[30px] text-[20px] text-[#a5faf7] font-semibold px-[20px] ">
        Subscribe now & get 20% off{" "}
      </p>
      <p className="md:text-[18px] w-[50%] text-[14px] text-center text-blue-100 font-semibold px-[20px]">
        Get 20% off your first order when you subscribe to our newsletter. 
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-[100%] h-[30%] md:h-[50%] flex items-center justify-center mt-[5px] gap-[20px] px-[20px] "
        action=""
      >
        <input
          type="text"
          required
          placeholder="Enter your email"
          className="placeholder:text-black bg-slate-300 w-[600px] max-w-[60%] h-[40px] px-[20px] rounded-lg shadow-sm shadow-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="text-[15px] md:text-[16px] px-[10px] md:px-[30px] py-[12px] md:py-[10px] hover:bg-slate-500 cursor-pointer bg-[#2e3030c9] text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] rounded-lg shadow-sm shadow-black"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default NewLetterBox;
