import axios from "axios";
import Head from "next/head";
import React from "react";
import { APIURL, JwtToken } from "../../components/api/base_url";
import Footer from "../../components/Home/Footer";
import Navbar from "../../components/navbar";
import Navmobile from "../../components/Navmobile";
import LogoFull from "../../public/logoFull.jpg";

export async function getServerSideProps({ params: { slug } }) {
  let data;

  await axios
    .get(APIURL + "page-footer/detail?nama=" + slug, {
      headers: {
        "Jwt-Key": JwtToken,
      },
    })
    .then((res) => {
      data = res.data.data;
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
      dataSlug: slug,
      single: data,
    },
  };
}

export default function footerDinamis({ dataSlug, single }) {
  return (
    <>
      <Head>
        <title>{dataSlug} | Detakpolitika</title>
        <link rel="icon" href="/logoFull.jpg" />
        <meta
          name="keywords"
          content="berita hari ini, berita harian, berita terkini, berita terbaru, berita indonesia, berita terpopuler, berita, info terkini, berita dunia, peristiwa hari ini"
        ></meta>
        <meta property="og:title" content={"DETAK POLITIKA | " + dataSlug} />
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

      <div className="md:px-32 px-6 min-h-screen">
        <div className="md:hidden">
          <Navmobile />
        </div>
        <div className="text-2xl my-4 font-bold">{dataSlug}</div>
        <div className="mt-6">
          <div
            dangerouslySetInnerHTML={{
              __html: single.body,
            }}
          />
        </div>
      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </>
  );
}
