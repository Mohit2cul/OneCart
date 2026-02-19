import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

function Order() {
  let [orderData, setOrderData] = useState([]);
  let { currency } = useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/userorders",
        {},
        {
          withCredentials: true,
        }
      );
      if (result.data) {
        let addOrdersItem = [];
        result.data.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            addOrdersItem.push(item);
          });
        });
        setOrderData(addOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-[98.8vw] min-h-[100vh] p-[20px] pb-[150px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025] ">
        <div className="h-[8%] w-[100%] mt-[80px] text-center">
          <Title text1={"My"} text2={"Orders"} />
        </div>
        <div className="w-[100%] h-[92%] flex flex-wrap gap-[20px] ">
          {orderData.map((item, index) => (
            <div key={index} className="w-[100%] h-[10%]">
              <div className="w-[100%] h-[80%] flex items-start gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative">
                <img
                  src={item.image1}
                  alt=""
                  className="w-[130px] h-[130px] rounded-lg"
                />
                <div className="flex items-start justify-center flex-col gap-[5px]">
                  <p className="md:text-[25px] text-[20px] text-[white]">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-[8px] md:gap-[20px]">
                    <p className="md:text-[18px] text-[12px] text-[#a4ffe7]">
                      Price: {currency}
                      {item.price}
                    </p>
                    <p className="md:text-[18px] text-[12px] text-[#a4ffe7]">
                      Quantity: {item.quantity}
                    </p>
                    <p className="md:text-[18px] text-[12px] text-[#a4ffe7]">
                      Size: {item.size}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="md:text-[18px] text-[12px] text-[#a4ffe7]">Date:<span className="text-[#e4fbff] pl-[10px] md:text-[16px] text-[11px] ">
                      {new Date(item.date).toDateString()}
                    </span>
                    </p> 
                  </div>
                  <div className="flex items-center">
                    <p className="md:text-[18px] text-[12px] text-[#a4ffe7]">Payment Method:<span className="text-[#e4fbff] pl-[10px] md:text-[18px] text-[12px] ">
                      {item.paymentMethod}
                    </span>   
                    </p>
                  </div>
                  <div className="absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%] ">
                    <div className="flex items-center gap-[5px] ">
                      <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                      <p className="md:text-[20px] text-[10px] text-[#f3f9fc]">{item.status}</p>
                    </div>
                  </div>
                  <div className="absolute md:right-[5%] right-[1%] md:top-[40%] top-[70%] ">
                    <button className="px-[15px] py-[7px] rounded-md bg-[#101919] text-[#f3f9fc] text-[12px] md:text-[16px] cursor-pointer active:bg-slate-500" onClick={loadOrderData}>Track Order </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Order;
