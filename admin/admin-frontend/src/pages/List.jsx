import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

function List() {
  let [list, setList] = useState([]);
  let { serverUrl } = useContext(authDataContext);

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list");
      setList(result.data.products);
      console.log("Product List:", result.data.products);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const removeListItem = async (id) => {
    try {
      console.log("Removing product with id:", id);
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true });
      
      console.log("Delete response:", result.data);
      
      if(result.status === 200) {
        console.log("Product deleted successfully");
        // Update state directly by filtering out the deleted product
        setList(list.filter(item => item._id !== id));
      }
      else{
        console.log("Error removing item - Status:", result.status);
      }
    } catch (error) {
      console.error("Error removing item:", error.response?.data || error.message);
      alert("Failed to remove product: " + (error.response?.data?.message || error.message));
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-[98.8vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <Navbar />
      <div className="w-[100%] h-[100%] flex items-center justify-start">
        <Sidebar />
        <div className="w-[82%] h-[100%] lg:ml-[320px] md-ml-[230px] mt-[30px] flex flex-col gap-[30px]overflow-x-hidden py-[50px] ml-[100px]">
          <div className="w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[30px] text-white">
            Products List
          </div>
          {list?.length > 0 ? (
            list.map((item, index) => (
              <div
                className="w-[80%] md:h-[120px] h-[90px] bg-slate-600 rounded-xl flex items-center justify-start gap-[5px] md:gap-[30px] mb-5 p-[5px] md:p-[18px]"
                key={index}
              >
                <img
                  src={item.image1}
                  className="w-[30%] md:w-[100px] h-[80%] rounded-lg gap-[20px] md:gap-[30px] object-cover"
                  alt=""
                />
                <div className="w-[90%] h-[80%] flex flex-col items-start justify-center gap-[4px]">
                  <div className="w-[100%] md:text-[20px] text-[15px] text-[#bef0f3]">
                    {item.name}
                  </div>
                  <div className="md:text-[17px] text-[15px] text-[#bef3da]">
                    {item.category}
                  </div>
                  <div className="md:text-[17px] text-[15px] text-[#bef3da]">
                    ₹ {item.price}
                  </div>
                </div>
                <div className="w-[10%] h-[100%] text-2xl bg-transparent flex items-center justify-center">
                  <RxCross2 className="w-[25px] h-[25px] rounded-md cursor-pointer md:hover:bg-red-400 md:hover:text-black" onClick={() => removeListItem(item._id)} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-white text-lg ">No Product Available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
