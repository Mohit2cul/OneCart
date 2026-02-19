import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaAngleRight } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import Title from "../components/Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "../components/Card";

function Collections() {
  let [showFilter, setShowFilter] = useState(true);
  let { products, search, showSearch } = useContext(shopDataContext);
  let [filterProducts, setFilterProducts] = useState([]);
  let [category, setCategory] = useState([]);
  let [subCategory, setSubCategory] = useState([]);
  let [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();
    
    const uniqueCategories = [...new Set(products.map(item => item.category))];
    const uniqueSubCategories = [...new Set(products.map(item => item.subCategory))];

    if(showSearch && search){
      const searchTerm = search.toLowerCase();
      // If searching for "men", "women", or "kids", match category exactly (case-insensitive)
      if (["men", "women", "kids"].includes(searchTerm)) {
        productCopy = productCopy.filter(
          item => item.category && item.category.toLowerCase() === searchTerm
        );
      } else {
        productCopy = productCopy.filter(item =>
          item.name.toLowerCase().includes(searchTerm) ||
          (item.category && item.category.toLowerCase().includes(searchTerm)) ||
          (item.subCategory && item.subCategory.toLowerCase().includes(searchTerm))
        );
      }
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) => {
        const itemCategory = item.category.toLowerCase();
        const hasMatch = category.some(cat => cat.toLowerCase() === itemCategory);
        return hasMatch;
      });
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) => {
        const hasMatch = subCategory.includes(item.subCategory);
        return hasMatch;
      });
    }
    // if (sortType === "low-to-high") {
    //   productCopy.sort((a, b) => a.price - b.price);
    // } else if (sortType === "high-to-low") {
    //   productCopy.sort((a, b) => b.price - a.price);
    // }
    // console.log("Filtered products:", productCopy.length);
    setFilterProducts(productCopy);
  };

  const sortProducts = (e) => {
    let fbCopy = filterProducts.slice();
    switch (sortType) 
    {
      case "low-to-high":
        setFilterProducts(fbCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-to-low":
        setFilterProducts(fbCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory , search, showSearch]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="w-[98.8vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start justify-start flex-col md:flex-row pt-[70px] overflow-x-hidden z-[2] pb-[100px]">
      <Navbar />
      <div
        className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] ${
          showFilter ? "h-[65vh]" : "h-[8vh]"
        } border-r-[1px] border-gray-400 p-[20px] lg:fixed text-[#aaf5fa]`}
      >
        <p
          className="text-[25px] font-semibold flex gap-[5px] uppercase items-center justify-start cursor-pointer"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
          {!showFilter && <FaAngleRight className="text-[20px] md:hidden" />}
          {showFilter && <FaChevronDown className="text-[20px] md:hidden" />}
        </p>
        <div
          className={`border-[1px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md cursor-pointer hover:shadow-md  hover:bg-[#ffffff0a] ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#f8fafa] font-medium">Category</p>
          <div className="w-[230px] h-[100px] flex items-start justify-center gap-[10px] flex-col ">
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light">
              {" "}
              <input
                type="checkbox"
                value={"men"}
                onChange={toggleCategory}
                className="w-5 hover:scale-110 transition-transform duration-200"
              />{" "}
              Men
            </p>
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light">
              {" "}
              <input
                type="checkbox"
                value={"women"}
                onChange={toggleCategory}
                className="w-5 hover:scale-110 transition-transform duration-200"
              />{" "}
              Women
            </p>
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light">
              {" "}
              <input
                type="checkbox"
                value={"kids"}
                onChange={toggleCategory}
                className="w-5 hover:scale-110 transition-transform duration-200"
              />{" "}
              Kids
            </p>
          </div>
        </div>
        <div
          className={`border-[1px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md cursor-pointer hover:shadow-md hover:bg-[#ffffff0a] ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#f8fafa] font-medium">Sub Category</p>
          <div className="w-[230px] h-[100px] flex items-start justify-center gap-[10px] flex-col ">
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light">
              {" "}
              <input
                type="checkbox"
                value={"Top Wear"}
                onChange={toggleSubCategory}
                className="w-5 hover:scale-110 transition-transform duration-200"
              />{" "}
              Top Wear
            </p>
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light">
              {" "}
              <input
                type="checkbox"
                value={"Bottom Wear"}
                onChange={toggleSubCategory}
                className="w-5 hover:scale-110 transition-transform duration-200"
              />{" "}
              Bottom Wear
            </p>
            <p className="flex items-center justify-center gap-[10px] text-[16px] font-light">
              {" "}
              <input
                type="checkbox"
                onChange={toggleSubCategory}
                value={"Winter Wear"}
                className="w-5 hover:scale-110 transition-transform duration-200"
              />{" "}
              Winter Wear
            </p>
          </div>
        </div>
      </div>
      <div className="lg:pl-[20%] md:py-[10px]">
        <div className="md:w-[80vw] w-[100vw] p-[20px] justify-between flex flex-col lg:flex-row lg:px-[50px]">
          <Title text1="All" text2="Collections" />
          <select
            name=""
            id=""
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            className="bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-[10px] text-white rounded-lg hover:border-[#46d1f7] border-[1px]"
          >
            <option value="relevant" className="w-[100%] h-[100%]">
              Sort By: Relevant
            </option>
            <option value="low-to-high" className="w-[100%] h-[100%]">
              Sort By: Low to High
            </option>
            <option value="high-to-low" className="w-[100%] h-[100%]">
              Sort By: High to Low
            </option>
          </select>
        </div>
        <div className="lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]  ">
          {filterProducts.map((item, index) => (
            <Card
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collections;
