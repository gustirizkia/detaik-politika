import axios from "axios";
import React, { useEffect } from "react";
import { APIURL, JwtToken } from "../components/api/base_url";
import Navbar from "../components/navbar";

export async function getServerSideProps({ query: q }) {
  let data;

  await axios
    .get(APIURL + "artikel?kategori_nama=" + q.q, {
      headers: {
        "Jwt-Key": JwtToken,
      },
    })
    .then((ress) => {
      data = ress.data.data.data;
    })
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      return {
        notFound: true,
      };
    });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      datas: data,
    },
  };
}

export default function Kategori({ datas }) {
  useEffect(() => {
    console.log("datas", datas);
  }, []);
  return (
    <>
      <div className="md:block hidden sticky bg-white  z-20 top-0 border-b">
        <div className="md:px-32 font-popins">
          <Navbar />
        </div>
      </div>
    </>
  );
}
