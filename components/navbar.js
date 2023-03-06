import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import axios from "axios";
import { APIURL, JwtToken } from "./api/base_url";
import { useRouter } from "next/router";
import { Dropdown } from "flowbite-react";

export default function Navbar() {
  const route = useRouter();
  const { q } = route.query;

  const [tempData, setTempData] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    console.log("disabled curren  eslint-disable-line"); // eslint-disable-line

    // eslint-disable-next-line
    console.log("disabled this one/ eslint-disable-next-line");

    // eslint-disable-next-line
    // eslint-disable-next-line react/jsx-no-bind
    // eslint-disable-next-line
    // eslint-disable-next-line
    handleFetchData();
  }, []);

  const handleFetchData = () => {
    axios
      .get(APIURL + "kategori", {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        setTempData(ress.data.data);
      })
      .catch((err) => {
        console.log("Server Error", err);
      });
  };

  const handleSearch = () => {
    axios
      .get(APIURL + "artikel?keyword=" + keyword, {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        console.log("response success", ress);
        route.push(`/search/${keyword}`);
      });
  };

  return (
    <div className="nav w-full">
      <div className="flex md:justify-between items-center">
        <div
          className="w-52 
          "
        >
          <Link href="/">
            <Image src={logo} layout="responsive" alt="Detakpolitika.com" />
          </Link>
        </div>
        <div className="item flex justify-end ">
          <div
            className={`"md:ml-8 ml-3 font-bold font-popins hover:text-pink-500 " `}
          >
            <Link
              href="/"
              className={`${route.pathname === "/" ? "text-pink-500" : " "}`}
            >
              Home
            </Link>
          </div>
          {tempData.map((item, index) => {
            return (
              <div key={index}>
                {item.sub_judul === null ? (
                  <div className="md:ml-8 group ml-3 font-bold font-popins hover:text-pink-500 relative">
                    {item.sub.length > 0 ? (
                      <>
                        <Dropdown
                          inline={true}
                          label={
                            <span
                              className={
                                q === "Internasional" || q === "Nasional"
                                  ? "text-pink-500"
                                  : ""
                              }
                            >
                              {item.nama}
                            </span>
                          }
                        >
                          {item.sub.map((sub_item) => {
                            return (
                              <Dropdown.Item>
                                <Link href={`/kategori?q=${sub_item.nama}`}>
                                  {sub_item.nama}
                                </Link>
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown>
                      </>
                    ) : (
                      <>
                        <Link
                          href={`/kategori?q=${item.nama}`}
                          className={`${
                            q === item.nama ? "text-pink-500" : " "
                          }`}
                        >
                          {item.nama}
                        </Link>
                      </>
                    )}

                    {/* {item.sub.length < 1 || (
                      <div className="hidden group-hover:block absolute font-medium bg-pink-500 pb-4 rounded-b-lg  left-1/2 transform -translate-x-1/2 p-4">
                        {item.sub.map((item, index) => {
                          return (
                            <div key={index}>
                              <Link href={`/kategori?q=${item.nama}`}>
                                <div className="  cursor-pointer hover:text-pink-200 mb-1 text-white underline">
                                  {item.nama}
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    )} */}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
        <div className=" items-center border-2 rounded-full px-1 focus-within:border-pink-500  overflow-x-hidden  py-1 w-52 border-gray-400 md:flex hidden">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-gray-500 w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            className="w-full focus:outline-none focus:ring-0 border-0 py-0 px-0"
            placeholder="Cari berita . . ."
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
