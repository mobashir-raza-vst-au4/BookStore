"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./../GlobalRedux/Features/user/userSlice";

export default function Page() {
  const dispatch = useDispatch();

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Perform form submission logic here using formData
      console.log(formData);
      // Make a POST request to the registration API
      const response = await axios.post(
        "https://backend-gamma-api.vercel.app/api/login",
        formData
      );
      console.log(response.data); // Assuming the response contains the registered user data

      // Reset form after submission
      setFormData({
        email: "",
        password: "",
      });
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      dispatch(setUser(response.data.user))
      router.push("/");
    } catch (error) {
      console.error(error);

      // Display error message
      if (error.response) {
        console.log(error.response.data); // Assuming the error response contains the error message
      } else {
        console.log("An error occurred during login.");
      }
    }
  };
  return (
    <div className="bg-white flex flex-col items-center h-screen">
      <Link href="/">
        <img
          className="w-[100px] object-contain my-5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="w-[300px] flex flex-col p-5 border border-gray-300">
        <h1 className="font-medium mb-5">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <h5 className="mb-[5px]">E-mail</h5>
          <input
            className="h-[30px] mb-[10px] bg-white w-[98%] border border-gray-300 rounded-md"
            onChange={handleOnchange}
            type="email"
            name="email"
            value={formData.email}
          />
          <h5 className="mb-[5px]">Password</h5>
          <input
            className="h-[30px] mb-[10px] bg-white w-[98%] border border-gray-300 rounded-md"
            onChange={handleOnchange}
            type="password"
            name="password"
            value={formData.password}
          />
          <button
            type="submit"
            className="bg-[#f0c14b] rounded-sm w-full h-[30px] border border-[#a88734] mt-[10px]"
          >
            Sign In
          </button>
        </form>
        <p className="text-[12px] mt-[15px]">
          By Sign-in you agree to Amazon's Conditions of Use & Sale. Please see
          our Privacy Notice, our Cookies Notice and our internet-Based Ads
          Notice.
        </p>
        <Link href="/register">
          <button
            // onClick={this.handleRegister}
            className="rounded-sm w-full h-[30px] border border-gray-400 mt-[10px] bg-gray-100 text-xs"
          >
            Create your Amazon Account
          </button>
        </Link>
      </div>
    </div>
  );
}
