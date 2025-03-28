"use client";

import { useState, useEffect } from "react";
import { LogIn, Search, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Modal from "./pages/Modal"; 

export default function Header() {
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <>
            <nav className="top-0 w-full z-50 bg-white">
                <div className="flex justify-between items-center max-w-[1220px] mx-auto px-4 py-5">
                    <Link href="/">
                        <Image src="/images/logo.svg" alt="logo" width={150} height={35} priority />
                    </Link>
                    <ul className="flex gap-8 font-medium text-gray-700">
                        <li className="flex gap-6">
                            <Link href='/'><h2>Home</h2></Link>
                            <Link href='/shop'><h2>Shop</h2></Link>
                        </li>
                    </ul>
                    <div className="flex items-center gap-6">
                        <button className="cursor-pointer"><Search size={24} /></button>
                        <button className="relative cursor-pointer"><ShoppingCart size={24} /></button>
                        <button className="relative cursor-pointer"><Heart size={24} /></button>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span>{user.name || user.email}</span>
                                <button onClick={handleLogout} className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md flex items-center ">Logout</button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#46A358] cursor-pointer text-white px-4 py-2 rounded-md flex items-center gap-2"
                            >
                                <LogIn size={16} /> Login
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} setUser={setUser} />}
        </>
    );
}
