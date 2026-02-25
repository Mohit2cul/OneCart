import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import upload from "../assets/upload.png";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

function Add() {
  let [image1, setImage1] = useState(null);
  let [image2, setImage2] = useState(null);
  let [image3, setImage3] = useState(null);
  let [image4, setImage4] = useState(null);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("Men");
  let [subCategory, setSubCategory] = useState("Top Wear");
  let [price, setPrice] = useState("");
  let [bestSeller, setBestSeller] = useState(false);
  let [sizes, setSizes] = useState([]);
  const { serverUrl } = useContext(authDataContext);

  const [errorMsg, setErrorMsg] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    // Frontend validation
    if (!image1 || !image2 || !image3 || !image4) {
      setErrorMsg("All four images are required.");
      return;
    }
    if (!name || !description || !category || !subCategory || !price) {
      setErrorMsg("Please fill all required fields.");
      return;
    }
    try {
      let formData = new FormData();
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestSeller", bestSeller);

      const requestUrl = serverUrl + "/api/product/addproduct";
      console.log("Add Product Request URL:", requestUrl);
      let result = await axios.post(requestUrl, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
      if (result.data) {
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setDescription("");
        setPrice("");
        setBestSeller(false);
        setSizes([]);
        setCategory("Men");
        setSubCategory("Top Wear");
        alert("Product Added Successfully");
      }
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Add Product Error");
      console.log("Add Product Error:", error);
    }
  };
  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-x-hidden relative">
      <Navbar />
      <Sidebar />

      <div className="w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[5%] ">
        {errorMsg && (
          <div className="w-full text-center text-red-400 bg-red-100 rounded p-2 mb-2">
            {errorMsg}
          </div>
        )}
        <form
          action=""
          onSubmit={handleAddProduct}
          className="w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]"
        >
          <div className="w-[400px] h-[50px] text-[25px] md:text-[40px] text-white">
            Add Product Page
          </div>
          <div className="w-[80%] h-[130px] flex items-start justify-center flex-col md:mt-[20px] gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Upload Images
            </p>
            <div className="w-[100%] h-[100%] flex items-center justify-start">
              <label
                htmlFor="image1"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]"
                required
              >
                <img
                  src={!image1 ? upload : URL.createObjectURL(image1)}
                  alt=""
                  className="w-[80%] h-[80%] rounded-lg shadow-2xl "
                />
                <input
                  type="file"
                  id="image1"
                  hidden
                  onChange={(e) => setImage1(e.target.files[0])}
                  required
                />
              </label>
              <label
                htmlFor="image2"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]"
              >
                <img
                  src={!image2 ? upload : URL.createObjectURL(image2)}
                  alt=""
                  className="w-[80%] h-[80%] rounded-lg shadow-2xl "
                />
                <input
                  type="file"
                  id="image2"
                  hidden
                  onChange={(e) => setImage2(e.target.files[0])}
                  required
                />
              </label>
              <label
                htmlFor="image3"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]"
              >
                <img
                  src={!image3 ? upload : URL.createObjectURL(image3)}
                  alt=""
                  className="w-[80%] h-[80%] rounded-lg shadow-2xl "
                />
                <input
                  type="file"
                  id="image3"
                  hidden
                  onChange={(e) => setImage3(e.target.files[0])}
                  required
                />
              </label>
              <label
                htmlFor="image4"
                className="w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7]"
              >
                <img
                  src={!image4 ? upload : URL.createObjectURL(image4)}
                  alt=""
                  className="w-[80%] h-[80%] rounded-lg shadow-2xl "
                />
                <input
                  type="file"
                  id="image4"
                  hidden
                  onChange={(e) => setImage4(e.target.files[0])}
                  required
                />
              </label>
            </div>
          </div>
          <div className="w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]">
            <p className="text-[20px] md:text-[25px] font-semibold">
              Product Name
            </p>
            <input
              type="text"
              placeholder="type here..."
              className="w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[1px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder-text-[#ffffffc2]"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="w-[80%] flex items-start justify-center flex-col gap-[10px]">
            <p className="text-[20px] md:text-[20px] font-semibold">
              Product Description
            </p>
            <textarea
              type="text"
              placeholder="type here..."
              className="w-[600px] max-w-[98%] h-[100px] rounded-lg hover:border-[#46d1f7] border-[1px] cursor-pointer bg-slate-600 pt-[10px] px-[20px] text-[18px] placeholder-text-[#ffffffc2]"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>
          <div className="w-[80%] flex items-center gap-[10px] flex-wrap">
            <div className="md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px] ">
              <p className="text-[20px] md:text-[19px] font-semibold w-[100%]">
                Product Category
              </p>
              <select
                name=""
                id=""
                className="bg-slate-600 w-[100%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[1px] text-[18px] cursor-pointer"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {/* <option value="">Select Category</option> */}
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px] ">
              <p className="text-[20px] md:text-[19px] font-semibold w-[100%] md:ml-8 ">
                Sub Category
              </p>
              <select
                name=""
                id=""
                className="bg-slate-600 w-[100%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[1px] text-[18px] cursor-pointer md:ml-8"
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
              >
                {/* <option value="">Select Category</option> */}
                <option value="Top Wear">Top Wear</option>
                <option value="Bottom Wear">Bottom Wear</option>
                <option value="Winter Wear">Winter Wear</option>
              </select>
            </div>
            <div className="w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]">
              <p className="text-[20px] md:text-[20px] font-semibold">
                Product Price
              </p>
              <input
                type="number"
                placeholder="₹ 1000"
                className="w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[1px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder-text-[#ffffffc2] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
                style={{ MozAppearance: "textfield" }}
              />
            </div>
          </div>
          <div className="w-[80%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-0">
            <p className="text-[20px] md:text-[20px] font-semibold">
              Product Size
            </p>
            <div className="flex items-center justify-start gap-[15px] flex-wrap">
              <div
                className={`px-[20px] py-[7px] rounded-md bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[1px] cursor-pointer ${
                  sizes.includes("S")
                    ? "border-[#46d1f7] bg-green-200 text-black"
                    : ""
                }`}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("S")
                      ? prev.filter((item) => item !== "S")
                      : [...prev, "S"]
                  )
                }
              >
                S
              </div>
              <div
                className={`px-[20px] py-[7px] rounded-md bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[1px] cursor-pointer ${
                  sizes.includes("M")
                    ? "border-[#46d1f7] bg-green-200 text-black"
                    : ""
                }`}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("M")
                      ? prev.filter((item) => item !== "M")
                      : [...prev, "M"]
                  )
                }
              >
                M
              </div>
              <div
                className={`px-[20px] py-[7px] rounded-md bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[1px] cursor-pointer ${
                  sizes.includes("L")
                    ? "border-[#46d1f7] bg-green-200 text-black"
                    : ""
                }`}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("L")
                      ? prev.filter((item) => item !== "L")
                      : [...prev, "L"]
                  )
                }
              >
                L
              </div>
              <div
                className={`px-[20px] py-[7px] rounded-md bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[1px] cursor-pointer ${
                  sizes.includes("XL")
                    ? "border-[#46d1f7] bg-green-200 text-black"
                    : ""
                }`}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("XL")
                      ? prev.filter((item) => item !== "XL")
                      : [...prev, "XL"]
                  )
                }
              >
                XL
              </div>
              <div
                className={`px-[20px] py-[7px] rounded-md bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[1px] cursor-pointer ${
                  sizes.includes("XXL")
                    ? "border-[#46d1f7] bg-green-200 text-black"
                    : ""
                }`}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("XXL")
                      ? prev.filter((item) => item !== "XXL")
                      : [...prev, "XXL"]
                  )
                }
              >
                XXL
              </div>
            </div>
          </div>
          <div className="w-[80%] flex items-center justify-start gap-[10px] mt-[20px] ">
            <input
              type="checkbox"
              id="checkbox"
              className="w-[22px] h-[22px] cursor-pointer"
              onChange={(e) => setBestSeller(e.target.checked)}
              checked={bestSeller}
            />
            <label
              htmlFor="checkbox"
              className="text-[18px] md:text-[20px] font-semibold"
            >
              Add to BestSeller{" "}
            </label>
          </div>
          <button className="w-[140px] px-[20px] py-[12px] rounded-xl bg-[#65d8f7] flex items-center justify-center gap-[10px] text-black active:bg-slate-700 active:text-white active:border-[1px] border-white font-medium">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
