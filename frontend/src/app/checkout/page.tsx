"use client";

import React from "react";
import Header from "./../Components/Header";
import { useSelector } from "react-redux";
import CheckoutProduct from "../Components/CheckoutProduct";
import Subtotal from "../Components/Subtotal";

export default function Page() {
  const basket = useSelector((state: any) => state.basket.basket);
  // console.log("basket", basket)..
  return (
    <>
      <Header />
      <div className="flex p-5 bg-white h-max">
        <div className="mr-[10px] p-[10px] border border-gray-100">
          <img
            className="w-full mb-[10px]"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._C8423492668_.jpg"
            alt=""
          />
          {basket.length === 0 && (
            <div>
              <h2>Your Shopping Cart is empty</h2>
              <p>
                You have no items in your cart. To buy one or more items, click
                "Add to Cart" next to the item.
              </p>
            </div>
          )}
          {basket.length >= 1 && (
            <div>
              <h2 className="checkout__title">Your Shopping Cart</h2>
              {/* List out all of the Checkout Products */}
              {basket &&
                basket.map((item: any) => {
                  // console.log("item each>>", item);
                  return (
                    // import CheckoutProduct
                    <CheckoutProduct key={item._id} item={item} />
                  );
                })}
            </div>
          )}
        </div>
        {basket.length > 0 && (
          <div className="checkout__right">
            <Subtotal basket={basket} />
          </div>
        )}
      </div>
    </>
  );
}
