"use client"

import { useGetProductsByCategoryQuery } from "@/app/redux/Rtk";
import ProductCard from "../FlowerList";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ({ selectedCategory, filteredPrice }) {
    const [sort, setSortOrder] = useState("default-sorting");
    const [selectedFilter, setSelectedFilter] = useState("all-plants");
    const { data: products = [], isLoading, isFetching, isError } = useGetProductsByCategoryQuery(`flower/category/${selectedCategory}?access_token=67dbc36eaf06d13e0cde0c21&sort=${sort}&type=${selectedFilter}&range_min=${filteredPrice[0]}&range_max=${filteredPrice[1]}`);
    const [currentPage, setCurrentPage] = useState(1);
    const topRef = useRef(null);
    const onePage = 9;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const totalPages = Math.ceil((products?.data?.length || 0) / onePage);
    const paginatedProducts = products?.data?.slice((currentPage - 1) * onePage, currentPage * onePage);
    console.log(paginatedProducts?.data);

    return (
        <div className="w-[74%] pl-5 pt-0">
            <div ref={topRef} className="flex justify-between items-center mb-10">
                <ul className="flex justify-start items-center gap-5 font-semibold">
                    {[{ label: "All Plants", value: "all-plants" }, { label: "New Arrivals", value: "new-arrivals" }, { label: "Sale", value: "sale" }].map(({ label, value }) => (
                        <li key={value} className={`cursor-pointer ${selectedFilter === value ? "text-[#46A358] border-b border-b-[#46A358]" : ""}`} onClick={() => setSelectedFilter(value)}>
                            {label}
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end gap-3 items-center font-semibold">
                    <p>Sorting: <select name="sort" className="outline-none font-normal" id="sort" onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="default-sorting">Default Sorting</option>
                        <option value="cheapthe-cheapest">The Cheapest</option>
                        <option value="most-expensive">Most Expensive</option>
                    </select>
                    </p>
                </div>
            </div>

            {isLoading || isFetching ? (
                <div className="grid grid-cols-3 justify-items-center gap-5">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="max-w-[300px] w-full border-t-2 border-t-transparent hover:border-t-[#46A358] transi group rounded">
                            <div className="card_img relative transi rounded overflow-hidden">
                                <div className="bg-[#FBFBFB] loading transi w-full h-[275px] flex justify-center items-center">
                                    <div className="w-full h-auto object-contain mix-blend-multiply scale-100 group-hover:scale-110 transi" />
                                </div>
                            </div>
                            <div>
                                <h4 className="transi my-2 w-[60%] loading h-[25px]"></h4>
                                <p className="w-[40%] h-[24px] loading"></p>
                            </div>
                        </div>
                    ))}
                </div>) : paginatedProducts?.length > 0 ? (<>
                    <div className="grid grid-cols-3 justify-items-center gap-5">
                        {paginatedProducts.map(product => (
                            <ProductCard key={product?.id} product={product} />
                        ))}
                    </div>
                    <div className="flex justify-end items-center gap-2 mt-5">
                        <button className="p-2 bg-gray-200 rounded disabled:opacity-40" disabled={currentPage === 1} onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}> <ChevronLeft /> </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-[#46A358] text-white" : "bg-gray-200"}`}>{i + 1}</button>
                        ))}
                        <button className="p-2 bg-gray-200 rounded disabled:opacity-50" disabled={currentPage === totalPages} onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} > <ChevronRight /></button>
                    </div>
                </>) : ( <div>No any Product</div> )}
        </div>
    );
}