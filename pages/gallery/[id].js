import axios from "axios";
import React from "react";
import { APIURL, JwtToken } from "../../components/api/base_url";
import Navbar from "../../components/navbar";

export async function getServerSideProps({ params: { id } }) {
  let data;
  await axios
    .get(APIURL + "gallery-detail/" + id, {
      headers: {
        "Jwt-Key": JwtToken,
      },
    })
    .then((res) => {
      data = res.data.data;

      console.log("data", data);
    })
    .catch((err) => {
      console.log("err", err);
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
      single: data,
    }, // will be passed to the page component as props
  };
}

export default function DetailGallery({ single }) {
  return (
    <>
      <div className="md:px-32 px-6 md:block hidden">
        <Navbar />
      </div>
      <div className="md:px-32 px-6">
        <div className="my-3">Home</div>
        <div className="text-2xl text-gray-800 font-medium">{single.nama}</div>
      </div>
    </>
  );
}
