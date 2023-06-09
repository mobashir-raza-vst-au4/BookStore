"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
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
      const response = await axios.post('https://backend-gamma-api.vercel.app/api/register', formData);
      console.log(response.data); // Assuming the response contains the registered user data

      // Reset form after submission
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      router.push("/login");
    } catch (error: any) {
      console.error(error);

      // Display error message
      if (error.response) {
        console.log(error.response.data); // Assuming the error response contains the error message
      } else {
        console.log("An error occurred during registration.");
      }
    }
  };

  return (
    <div className="bg-white flex flex-col items-center h-screen">
      <Link href="/login">
        <img
          className="w-[100px] object-contain my-5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="w-[300px] flex flex-col p-5 border border-gray-300">
        <h1 className="font-medium mb-5">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <h5 className="mb-[5px]">Username</h5>
          <input
            className="h-[30px] mb-[10px] bg-white w-[98%] border border-gray-300 rounded-md"
            onChange={handleOnchange}
            type="text"
            name="username"
            value={formData.username}
          />
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
            // onClick={this.handleSignIn}
            type="submit"
            className="bg-[#f0c14b] rounded-sm w-full h-[30px] border border-[#a88734] mt-[10px]"
          >
            Sign Up
          </button>
        </form>
        <p className="text-[12px] mt-[15px]">
          By Sign-up you agree to Amazon's Conditions of Use & Sale. Please see
          our Privacy Notice, our Cookies Notice and our internet-Based Ads
          Notice.
        </p>
        <Link href="/login">
          <button
            // onClick={this.handleRegister}
            className="rounded-sm w-full h-[30px] border border-gray-400 mt-[10px] bg-gray-100 text-xs"
          >
            Already have an account
          </button>
        </Link>
      </div>
    </div>
  );
}
