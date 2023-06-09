"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SavingsIcon from "@mui/icons-material/Savings";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Header() {
  const basket = useSelector((state: any) => state.basket.basket);
  const userFromRedux = useSelector((state: any) => state.user.user);
  const router = useRouter();
  // Check if localStorage is defined before accessing it
  const userFromLocal = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user")) : null;

  console.log("local", userFromLocal);
  const [user, setUser] = useState(userFromLocal);

  const handleLogout = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    localStorage.clear();
    router.push("/login");
  };

  useEffect(() => {
    console.log("jdjdj", userFromRedux);
    const userFromLocal = JSON.parse(localStorage.getItem("user"));
    setUser(userFromLocal);
  }, [userFromRedux]);
  return (
    <nav className="bg-[#131921] flex items-center sticky top-0 z-100">
      {/* logo on the left */}
      <Link href="/">
        <img
          className="w-[100px] mt-[18px] mx-5 mb-0 object-contain"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>

      {/* search box */}
      <div className="flex flex-1">
        <input type="text" className="h-[24px] p-[10px] w-full border-none" />
        <SearchIcon className="p-[5px] bg-[#febd69] " />
      </div>
      {/* 3 links */}
      <div className="flex justify-evenly">
        {/* 1st link */}
        <div
          onClick={handleLogout}
          className="text-white no-underline cursor-pointer"
        >
          <div className="flex flex-col mx-[10px]">
            <span className="text-[10px]">
              Hello,
              {user?.username}
            </span>
            <span className="text-[13px] font-extrabold">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </div>
        {/* 2nd link */}
        <Link href="/" className="text-white no-underline">
          <div className="flex flex-col mx-[10px]">
            <span className="text-[10px]">Returns</span>
            <span className="text-[13px] font-extrabold">& Orders</span>
          </div>
        </Link>
        {/* 3rd link */}
        <Link href="/" className="text-white no-underline">
          <div className="flex mx-[10px] items-center">
            <SavingsIcon />
            <span className="text-[13px] font-extrabold mx-[10px]">
              {user?.points}
            </span>
          </div>
        </Link>
        {/* 4th link */}
        <Link href="/checkout" className="text-white no-underline">
          <div className="flex items-center">
            {/* shopping basket icon */}
            <ShoppingBasketIcon />
            {/* Number of items in the basket */}
            <span className="text-[13px] font-extrabold mx-[10px]">
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
