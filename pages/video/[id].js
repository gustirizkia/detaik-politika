import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { APIURL, JwtToken } from "../../components/api/base_url";
import Navbar from "../../components/navbar";
import Navmobile from "../../components/Navmobile";
import LogoFull from "../../public/logoFull.jpg";

export async function getServerSideProps({ params: { id } }) {
  let data;
  await axios
    .get(APIURL + "video-detail/" + id, {
      headers: {
        "Jwt-Key": JwtToken,
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
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

export default function DetailVideo({ single }) {
  const [beritaRekomendasi, setBeritaRekomendasi] = useState([]);
  const fetchRekomendasi = () => {
    axios
      .get(APIURL + "artikel/rekomendasi", {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        setBeritaRekomendasi(ress.data.data);
      })
      .catch((err) => {
        console.log("Server rekomendasi error");
      });
  };

  useEffect(() => {
    fetchRekomendasi();
  }, []);
  return (
    <>
      <Head>
        <title>{"Video : " + single.nama}</title>
        <link rel="icon" href="/logoFull.jpg" />
        <meta
          name="keywords"
          content="berita hari ini, berita harian, berita terkini, berita terbaru, berita indonesia, berita terpopuler, berita, info terkini, berita dunia, peristiwa hari ini"
        ></meta>
        <meta property="og:title" content={"Video : " + single.nama} />
        <meta
          name="description"
          content="detakpolitik.com - Kabar terbaru hari ini Indonesia dan Dunia, Kabar terkini news, peristiwa, ekonomi, hukum"
        ></meta>
        <meta property="og:image" content={LogoFull.src} />
        <meta
          property="og:description"
          content="detakpolitik.com - Kabar terbaru hari ini Indonesia dan Dunia, Kabar terkini news, peristiwa, ekonomi, hukum"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
      </Head>
      <div className="md:block hidden sticky bg-white  z-20 top-0 border-b">
        <div className="md:px-32 font-popins">
          <Navbar />
        </div>
      </div>
      <div className="md:hidden sticky z-20 top-0 bg-white">
        <Navmobile />
      </div>
      <div className="px-4 md:px-32 font-popins relative">
        <div className="my-4">
          <span>
            <Link href={"/"}>Home</Link> {">"} Video {">"} {single.nama}
          </span>
        </div>
        <div className="grid grid-flow-row grid-cols-12 gap-4 md:gap-10">
          <div className="col-span-12 md:col-span-8">
            <div className="h-96">
              <iframe
                id="ytplayer"
                className="rounded-lg"
                type="text/html"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${single.link}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                frameborder="0"
              ></iframe>
            </div>
            <div className="mt-6">
              <div
                dangerouslySetInnerHTML={{
                  __html: single.deskripsi,
                }}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className=" flex">
              <div className="text-2xl font-bold text-gray-800">
                Topik Rekomendasi
                <div className=" h-1 mt-2 bg-pink-500 rounded-full block"></div>
              </div>
            </div>
            {beritaRekomendasi.map((item, index) => {
              return (
                <div key={index}>
                  <div className="mt-8" key={index}>
                    <Link href={`/berita/${item.slug}`}>
                      <div className="font-bold text-lg text-gray-800 mb-4">
                        {item.judul.length >= 70
                          ? item.judul.substring(0, 62) + "..."
                          : item.judul}
                      </div>
                    </Link>
                    <div className="bg-gray-200 border w-full rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
