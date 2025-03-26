"use client";
import { ShoppingCart, Search, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
    
export default function ProductCard({ product: { title: name, _id: id, main_image, price, discount_price, discount: isSale } }) {
    const router = useRouter();

    const calculateDiscountPercent = (originalPrice, discountedPrice) => {
        const discounted = Number(discountedPrice);
        if (!originalPrice || !discounted || originalPrice <= discounted) return 0;
        return Math.round(((originalPrice - discounted) / originalPrice) * 100);
    };

    const discountPercent = calculateDiscountPercent(price, discount_price);

    return (
        <div className="max-w-[300px] w-full border-t-2 border-t-transparent hover:border-t-[#46A358] transi group rounded">
            <div className="card_img relative transi rounded overflow-hidden ">
                <div className="bg-[#FBFBFB] transi w-full h-[275px] flex justify-center items-center">
                    <Image width={250} height={250} priority src={main_image} alt={name} className="w-full h-auto object-contain mix-blend-multiply scale-100 group-hover:scale-110 transi" />
                </div>
                <div className="flex justify-center items-center absolute w-full bottom-0 transi gap-0.5 group-hover:opacity-100 opacity-0 group-hover:gap-3 group-hover:bottom-2">
                    <button className="p-2 hover:bg-gray-200 transi bg-white rounded cursor-pointer">
                        <ShoppingCart size={19} />
                    </button>
                    <button className="p-2 hover:bg-gray-200 transi bg-white rounded cursor-pointer">
                        <Heart size={19} />
                    </button>
                    <button className="p-2 hover:bg-gray-200 transi bg-white rounded cursor-pointer">
                        <Search size={19} />
                    </button>
                </div>
                {isSale && <div className="absolute opacity-100 rounded-br transi group-hover:opacity-0 group-hover:-left-15 group-hover:-top-5 top-0 left-0 bg-[#46A358] text-white px-2 py-[2px] font-bold">{discountPercent}% <span className="text-sm">OFF</span></div>}
            </div>
            <div>
                <h4 className="font-bold mt-4 group-hover:text-[#46A358] transi group-hover:mt-2 group-hover:mb-2">{name}</h4>
                {discountPercent !== 0 ? (
                    <p className="text-[#46A358] font-semibold">
                        ${Number(discount_price).toFixed(2)} <span className="line-through text-gray-400 text-xs group-hover:text-sm transi">${price.toFixed(2)}</span>
                    </p>
                ) : ( <p className="text-black font-semibold">${price.toFixed(2)}</p>)}
            </div>
        </div>
    );
}
