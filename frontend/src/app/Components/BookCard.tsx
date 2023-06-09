"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "./../GlobalRedux/Features/basket/basketSlice";

export default function BookCard({ book }: any) {
  const dispatch = useDispatch();

  const handleAddToCart = (item: any) => {
    dispatch(addToBasket(item))
  };
  return (
    <div key={book._id} className="flex flex-col items-center justify-end max-h-[400px] min-w-[100px] m-[10px] p-[20px] w-full bg-gray-50 border z-1">
      <img
        className="max-w-[100px] w-full object-contain mb-[15px]"
        src={book.coverImage}
        alt=""
      />
      <div className="h-[100px] mb-[15px]">
        <p className="">{book.title}</p>
        <p className="mt-[5px]">
          <small>$</small>
          <strong>{book.price}</strong>
        </p>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index}>⭐</span>
          ))}
        </div>
      </div>
      <button
        className="bg-[#f0c14b] border border-[#a88734] text-sm px-2"
        onClick={() => {
          handleAddToCart(book);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
