"use client";

import { useGetDataQuery } from "@/app/redux/Rtk";
import { useState, useMemo } from "react";
import { Slider } from "antd";
import MainByCategory from "./ListHost";

export default function Main() {
    const [selectedCategory, setSelectedCategory] = useState("house-plants");
    const { data: categories = [], isLoading, isFetching, isError } = useGetDataQuery("flower/category");
    console.log(selectedCategory);
    console.log(categories);
    const [price, setPrice] = useState([0, 2000]);
    const [filteredPrice, setFilteredPrice] = useState([0, 2000]);

    const handleFilterApply = () => {
        setFilteredPrice(price);
    };

    return (
        <div className="max-w-[1240px] px-4 m-auto flex justify-between items-start gap-6 mt-10">
            <div className="w-[24%] bg-[#FBFBFB] pt-4 rounded-xl overflow-hidden">
                <div className="px-3">
                    <h3 className="font-bold text-lg">Categories</h3>
                    {isLoading || isFetching ? (
                        <ul>
                            {[...Array(9)].map((_, i) => (
                                <li key={i} className="transi w-[90%] m-auto h-[24px] my-3 loading"></li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="transi">
                            {categories?.data.map((category) => (
                                <li key={category?.id || category?.route_path || category?.title}
                                    onClick={() => category?.route_path && setSelectedCategory(category.route_path)}
                                    className={`cursor-pointer ${category?.route_path === selectedCategory ? "text-[#46A358] font-semibold " : "hover:text-[#46A358] font-normal"} pl-4 transi flex justify-between items-center pr-2 my-2`} >
                                    {category?.title} <span>({
                                        category?.route_path === 'seeds' ? category?.count + 1 :
                                            category?.route_path === 'house-plants' ? category?.count + 5 :
                                                category?.route_path === 'potter-plants' ? category?.count + 24 :
                                                    category?.count}
                                        )</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mt-4 px-3">
                    <h2 className="font-semibold mb-2">Price Range</h2>
                    <div className="px-3">
                        <Slider range min={0} max={2000} step={1} value={price} trackStyle={[{ backgroundColor: "#46A358" }]} onChange={(value) => setPrice(value)} />
                    </div>
                    <p className="text-[#46A358] font-medium">Price: ${price[0]} – ${price[1]}</p>
                    <button onClick={handleFilterApply} className="cursor-pointer mt-2 px-4 py-2 font-semibold rounded-lg bg-[#46A358] text-white">Filter</button>
                </div>
                <div className="mt-[10px]">
                    <img src="/images/sale_ad.png" alt="ad" width={1} height={1} className="w-full h-auto mix-blend-multiply" />
                </div>
            </div>
            <MainByCategory selectedCategory={selectedCategory} filteredPrice={filteredPrice}/>
        </div>
    );
}