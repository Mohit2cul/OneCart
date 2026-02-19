import React from "react";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import { useState } from "react";
import CartTotal from "../components/CartTotal";
import { shopDataContext } from "../context/ShopContext";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  let [method, setMethod] = useState("cod");
  let navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, deliveryFee, products } = useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);
  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phoneNumber: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async function (response) {
        console.log(response);
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
        paymentMethod: method,
      };

      switch (method) {
        case "razorpay":
          const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, {
            withCredentials: true,
          })
          if(resultRazorpay.data){
            // console.log("Razorpay Order Created:", resultRazorpay.data);4
            initPay(resultRazorpay.data);
          }
          
          console.log(paymentResult.data);

          break;
        case "cashondelivery":
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            orderData,
            { withCredentials: true }
          );
          console.log(result.data);
          if(result.data){
            setCartItem({});
            navigate("/order");
          }else{
            console.log(result.data.message);
          }
          break;
        default:
          console.log("Invalid payment method selected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[98.8vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative">
      <Navbar />
      <div className="lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[50px] mt-[90px] ">
  <form onSubmit={onSubmitHandler} className="lg:w-[70%] w-[95%] lg:h-[70%] h-[100%] flex flex-col mt-6 ">
          <div className="py-[10px]">
            <Title text1={"Delivery"} text2={"Information"} />
          </div>
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="First name"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] "
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] "
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
            />
          </div>
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="email"
              placeholder="Email address"
              className="w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] "
              required
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
            />
          </div>
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="Address"
              className="w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] "
              required
              onChange={onChangeHandler}
              name="address"
              value={formData.address}
            />
          </div>
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="City"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] "
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
            />
            <input
              type="text"
              placeholder="State"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] "
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
            />
          </div>
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="Pincode"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] "
              required
              onChange={onChangeHandler}
              name="pincode"
              value={formData.pincode}
            />
            <input
              type="text"
              placeholder="Country"
              className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] "
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
            />
          </div>
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
            <input
              type="text"
              placeholder="Phone Number"
              className="w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] mb-2"
              required
              onChange={onChangeHandler}
              name="phoneNumber"
              value={formData.phoneNumber}
            />
          </div>
          <div className="flex justify-center mt-4 px-[20px] mb-4">
            <button
              type="submit"
              className="text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[60px] rounded-2xl text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] hover:scale-[105%] hover:bg-[#3bcee8] hover:text-[#141414] transition-all duration-200 font-semibold"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
      <div className="lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px] ">
        <div className="lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col ml-0 lg:ml-10">
          <CartTotal />
          <div className="py-[10px] ">
            <Title text1={"Payment"} text2={"Method"} />
          </div>
          <div className="w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px] ">
            <button
              onClick={() => setMethod("razorpay")}
              className={`border-[1px] border-[#80808049] text-white py-[10px] px-[20px] rounded-2xl ${
                method === "razorpay" ? "bg-[#3bcee848]" : "bg-[#3bcee848]"
              } hover:scale-[105%] hover:bg-[#3bcee8] hover:text-[#141414] transition-all duration-200 font-semibold`}
            >
              Razorpay
            </button>
            <button
              onClick={() => setMethod("cashondelivery")}
              className={`border-[1px] border-[#80808049] text-white py-[10px] px-[20px] rounded-2xl ${
                method === "cashondelivery"
                  ? "bg-[#3bcee848]"
                  : "bg-[#3bcee848]"
              } hover:scale-[105%] hover:bg-[#3bcee8] hover:text-[#141414] transition-all duration-200 font-semibold`}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
