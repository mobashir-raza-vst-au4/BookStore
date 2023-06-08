'use client';

import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./../GlobalRedux/Features/user/userSlice";
import { clearBasket } from "./../GlobalRedux/Features/basket/basketSlice";
import { useRouter } from "next/navigation";

export default function SubTotal({ basket }: any) {
  const dispatch = useDispatch()
  const router = useRouter();

  console.log("what--", basket);
  const getTotal = `${basket.reduce((amount: any, item: any) => {
    // console.log(amount, item)
    return amount + item.price;
  }, 0)}`;
  const user = JSON.parse(localStorage.getItem("user"));
  const createOrder = async () => {
    try {
      // Make the API request to create the order
      const response = await axios.post("http://localhost:8005/api/order", {
        items: basket.map((item: any) => item),
        userId: user._id,
      });

      // Handle the response, such as displaying a success message
      console.log(response);

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
        dispatch(setUser())
        dispatch(clearBasket())
        router.push('/')
      }

    } catch (error) {
      // Handle any errors that occur during the API request
      console.error(error);
      alert(error.response.data.message || error.message)
    }
  };
  return (
    <div className="flex flex-col justify-between w-[300px] h-[120px] p-5 bg-[#f3f3f3] border border-[#dddddd] rounded-sm ">
      {/* price */}
      <p>
        Subtotal({basket.length} items): {<strong>${getTotal}</strong>}
      </p>

      <small className="flex items-center">
        <input className="mr-[5px]" type="checkbox" />
        <img
          className="-mt-[3px] mr-[5px] align-top"
          src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/checkout/gifts_icon._CB480856104_.png"
        />
        <span className="-mt-[3px]">This order contains a gift</span>
      </small>
      <button
        onClick={() => {
          createOrder();
        }}
        className="bg-[#f0c14b] rounded-[2px] w-full h-[30px] border border-[#a88734] mt-[10px]"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
