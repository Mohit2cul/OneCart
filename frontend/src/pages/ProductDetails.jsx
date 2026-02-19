import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import Navbar from "../components/Navbar";

function ProductDetails() {
  let { productId } = useParams();
  let { products, currency, addToCart } = useContext(shopDataContext);
  let [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        console.log(productData);
        setImage(item.image1);
        setImage1(item.image1);
        setImage2(item.image2);
        setImage3(item.image3);
        setImage4(item.image4);
        setSize(item.size);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="">
      <div className="lg:w-[100vw] w-[100vw] h-[130vh] md:h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] lg:flex-row flex-col flex items-center justify-center gap-[20px] ">
        <Navbar />
        <div className="lg:w-[50vw] md:w-[90vw] lg:h-[88vh] h-[50vh] mt-[70px] flex items-center justify-center md:gap-[10px] gap-[30px] flex-col-reverse lg:flex-row ">
          <div className="lg:w-[20%] md:w-[80%] h-[10%] lg:h-[80%] flex items-center justify-center gap-[50px] lg:gap-[20px] lg:flex-col flex-wrap ">
            <div className="md:w-[100px] w-[50px] h-[50px] md:h-[85px] bg-slate-300 border-[1px] border-[#80808049] rounded-md">
              <img
                src={image1}
                alt=""
                className="w-[100%] h-[100%] cursor-pointer rounded-md"
                onClick={() => setImage(image1)}
              />
            </div>
            <div className="md:w-[100px] w-[50px] h-[50px] md:h-[85px] bg-slate-300 border-[1px] border-[#80808049] rounded-md">
              <img
                src={image2}
                alt=""
                className="w-[100%] h-[100%] cursor-pointer rounded-md"
                onClick={() => setImage(image2)}
              />
            </div>
            <div className="md:w-[100px] w-[50px] h-[50px] md:h-[85px] bg-slate-300 border-[1px] border-[#80808049] rounded-md">
              <img
                src={image3}
                alt=""
                className="w-[100%] h-[100%] cursor-pointer rounded-md"
                onClick={() => setImage(image3)}
              />
            </div>
            <div className="md:w-[100px] w-[50px] h-[50px] md:h-[85px] bg-slate-300 border-[1px] border-[#80808049] rounded-md">
              <img
                src={image4}
                alt=""
                className="w-[100%] h-[100%] cursor-pointer rounded-md"
                onClick={() => setImage(image4)}
              />
            </div>
          </div>
          <div className="lg:w-[60%] w-[80%] lg:h-[78%] h-[70%] border-[1px] border-[#80808049] rounded-md overflow-hidden">
            <img
              src={image}
              alt=""
              className="w-[100%] lg:h-[100%] text-[30px] text-white text-center rounded-md object-fill"
            />
          </div>
        </div>
        <div className="lg:w-[50vw] w-[100vw] lg:h-[75vh] h-[40vh] lg:mt-[80px] flex items-start justify-start flex-col py-[20px] px-[30px] md:pb-[20px] md-pl-[20px] lg:pl-[0px] lg:px-[0px] lg:py-[0px] gap-[10px] ">
          <h1 className="text-[40px] font-semibold text-[aliceblue]">
            {productData.name.toUpperCase()}
          </h1>
          <h2 className="text-[25px] font-semibold text-[#00df9a]">
            {currency} {productData.price}
          </h2>
          <div className="flex flex-col gap-[10px] my-[10px] ">
            <p className="text-[25px] font-semibold pl-[5px] text-white ">
              Select Size
            </p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    className={`border py-2 px-4 rounded-md ${item === size ? 'bg-[#86f8b7]' : 'bg-slate-300'}`}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))
              }
            </div>
          </div>
          <p className="text-[18px] font-normal w-[60%] text-[#808080]">
            {productData.description}
          </p>
          <div className="flex items-center justify-between mt-[30px]">
            <button className="bg-[#00df9a] text-[black] font-semibold px-[45px] py-[8px] rounded-md hover:bg-[#00b37e] mr-[20px]" onClick={() => addToCart(productData._id, size)}>
              Add to Cart
            </button>
            {/* <button className="bg-[#141414] border-[1px] border-[#00df9a] text-[#00df9a] font-semibold px-[20px] py-[10px] rounded-md hover:bg-[#00df9a] hover:text-[black]">
              Buy Now
            </button> */}
          </div>
          {/* <div className="w-[90%] h-[1px] bg-slate-700"></div>
          <div className="w-[80%] text-[16px] text-white">
            <p>100% original product</p>
            <p>Free returns within 30 days</p>
            <p>Pay on delivery might be available</p>
          </div> */}
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default ProductDetails;
