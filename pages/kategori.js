import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { APIURL, JwtToken, STORAGEURL } from "../components/api/base_url";
import Berita from "../components/Home/Berita";
import Footer from "../components/Home/Footer";
import Terbaru from "../components/Home/Terbaru";
import Navbar from "../components/navbar";
import Navmobile from "../components/Navmobile";
import ScrollTop from "../components/ScrollTop";
import LogoFull from "../public/logoFull.jpg";

export async function getServerSideProps({ query: q }) {
  let data;
  let parentKategori;
  await axios
    .get(APIURL + "kategori/detail?nama=" + q.q, {
      headers: {
        "Jwt-Key": JwtToken,
      },
    })
    .then((ress) => {
      data = ress.data.artikel.data;
      if (ress.data.parent_kategori !== null) {
        parentKategori = ress.data.parent_kategori.nama;
      } else {
        parentKategori = 1;
      }
      // console.log("datas", data);
    })
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
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
      kategori: q.q,
      parent_kategori: parentKategori,
    },
  };
}

export default function Kategori({ datas, kategori, parent_kategori }) {
  const [BeritaTerbaru, setBeritaTerbaru] = useState([]);

  const handleBeritaTerbaru = () => {
    axios
      .get(APIURL + "artikel/terbaru?", {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        setBeritaTerbaru(ress.data.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    handleBeritaTerbaru();
  }, []);

  return (
    <>
      <Head>
        <title>
          Detak Politika |{" "}
          {parent_kategori !== 1 ? parent_kategori + " | " : ""} {kategori}
        </title>
        <link rel="icon" href="/logoFull.jpg" />
        <meta
          name="keywords"
          content="berita hari ini, berita harian, berita terkini, berita terbaru, berita indonesia, berita terpopuler, berita, info terkini, berita dunia, peristiwa hari ini"
        ></meta>
        <meta property="og:title" content="DETAK POLITIKA | Melangkah Maju" />
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
      <ScrollTop />
      <div className="md:block hidden sticky bg-white  z-20 top-0 border-b">
        <div className="md:px-32 font-popins">
          <Navbar />
        </div>
      </div>

      <div className="md:hidden mb-2  sticky z-20 top-0 bg-white">
        <Navmobile />
      </div>
      <div className="px-4 md:px-32 font-popins relative md:mt-10">
        <div className="grid grid-flow-row grid-cols-12 gap-8">
          <div className=" md:col-span-8 col-span-12">
            <div className="md:font-bold font-semibold md:text-xl mb-4 md:mb-10">
              Kategori {">"}{" "}
              {parent_kategori !== 1 ? parent_kategori + " > " : ""} {kategori}
              <hr className="mt-4" />
            </div>
            {datas.map((item, index) => {
              return (
                <div className="" key={index}>
                  <Berita
                    title={item.judul}
                    created_at={item.tanggal_dipublish}
                    kategori={item.kategori.nama}
                    linkBerita={"/berita/" + item.slug}
                    image_url={STORAGEURL + item.image}
                    gap={4}
                  />
                </div>
              );
            })}
          </div>
          <div className=" md:col-span-4 col-span-12">
            <div className="font-bold text-xl mb-4">Terbaru</div>
            <div className="w-full h-1 mt-2 bg-pink-500 rounded-full block mb-8"></div>
            {BeritaTerbaru.map((item, index) => {
              return (
                <div className="" key={index}>
                  <Terbaru
                    title={item.judul}
                    created_at={item.tanggal_dipublish}
                    kategori={item.kategori.nama}
                    linkBerita={"/berita/" + item.slug}
                    image_url={STORAGEURL + item.image}
                    gap={4}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
