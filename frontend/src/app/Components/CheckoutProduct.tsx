"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "./../GlobalRedux/Features/basket/basketSlice";

export default function CheckoutProduct({ item }: any) {
  const dispatch = useDispatch();

  const removeFromCart = (id: any) => {
    dispatch(removeFromBasket(id));
  };
  return (
    <div className="flex my-5">
      <img
        className="object-contain w-[180px] h-[180px]"
        src={item.coverImage}
        alt=""
      />
      <div className="pl-5">
        <p className="text-[17px] font-bold">{item.title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{item.price}</strong>
        </p>
        <div className="flex">
          {Array(5)
            .fill()
            .map((_, index) => {
              return <p key={index}>⭐</p>;
            })}
        </div>
        <button
          className="bg-[#f0c14b] border border-[#a88734] mt-[10px] px-2"
          onClick={() => {
            removeFromCart(item._id);
          }}
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
}
