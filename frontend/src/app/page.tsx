"use client";
import Header from "./Components/Header";
import BookCard from "./Components/BookCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Home() {
  const router = useRouter();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    console.log("run effect", books);
    const tokenFromLocalStorage = localStorage.getItem("token");
    const isLoggedIn = tokenFromLocalStorage ? JSON.parse(tokenFromLocalStorage) : false; // Check if the user is logged in
    if (!isLoggedIn) {
      router.push("/login"); // Redirect to the login page if not logged in
      return;
    }

    //call an API to get all books.
    // Fetch all books from the API
    axios
      .get("https://backend-gamma-api.vercel.app/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
      });
  }, []);
  return (
    <div className="">
      <Header />
      <div className="mx-auto max-w-[1500px]">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        />
        <div className="grid grid-cols-3 gap-4 z-1">
          {books.map((book: any) => (
            <BookCard key={book?._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
