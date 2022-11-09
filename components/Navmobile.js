import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Splide, SplideSlide } from "splide-nextjs/react-splide";
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css";
import logo from "../public/logo.png";

export default function Navmobile() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div
          className="w-52 
          "
        >
          <Image src={logo} layout="responsive" alt="Detakpolitika.com" />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-gray-500 w-10 h-10 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <Splide
        hasTrack={false}
        options={{
          gap: "16px",
          drag: "free",
          pagination: false,
          arrows: false,
          type: "loop",
          autoWidth: true,
        }}
      >
        <SplideSlide>
          <div className="inline-block font-bold font-popins hover:text-pink-500">
            <Link href="">Home</Link>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="inline-block font-bold font-popins hover:text-pink-500">
            <Link href="">Politik</Link>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="inline-block font-bold font-popins hover:text-pink-500">
            <Link href="">Ekonomi</Link>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="inline-block font-bold font-popins hover:text-pink-500">
            <Link href="">Hukum</Link>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="inline-block font-bold font-popins hover:text-pink-500">
            <Link href="">Parlemen</Link>
          </div>
        </SplideSlide>
      </Splide>
    </>
  );
}
