import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar";
import Navmobile from "../../components/Navmobile";
import axios from "axios";
import { APIURL, JwtToken, STORAGEURL } from "../../components/api/base_url";
import Image from "next/image";
import Terbaru from "../../components/Home/Terbaru";
import Wa from "../../public/images/logos_whatsapp-icon.png";
import Tw from "../../public/images/logos_twitter.png";
import Fb from "../../public/images/logos_facebook.png";
import Link from "next/link";
import Footer from "../../components/Home/Footer";
import Head from "next/head";
import ScrollTop from "../../components/ScrollTop";

export async function getServerSideProps({ params: { slug } }) {
  let data;
  let loading = true;
  await axios
    .get(APIURL + "artikel/detail?slug=" + slug, {
      headers: {
        "Jwt-Key": JwtToken,
      },
    })
    .then((res) => {
      data = res.data.data;
      loading = false;
    })
    .catch((err) => {
      loading = false;
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
      dataReady: loading,
    }, // will be passed to the page component as props
  };
}

export default function DetailArtikel({ single, dataReady }) {
  const [SkeletonBeritaTerbaru, setSkeletonBeritaTerbaru] = useState(true);
  const [BeritaTerbaru, setBeritaTerbaru] = useState([]);
  const [beritaRekomendasi, setBeritaRekomendasi] = useState([]);
  const [hostUrl, setHostUrl] = useState("");

  const router = useRouter();

  const handleBeritaTerbaru = () => {
    axios
      .get(APIURL + "artikel/terbaru?", {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        setBeritaTerbaru(ress.data.data.data);
        setSkeletonBeritaTerbaru(false);
      })
      .catch((err) => {
        setSkeletonBeritaTerbaru(false);
      });
  };

  useEffect(() => {
    handleBeritaTerbaru();
    fetchRekomendasi();
    console.log(single.image);
  }, []);

  useEffect(() => {
    setHostUrl(window.location.host);
  }, []);

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

  const tagSkeleton = () => {
    return Array.from(Array(8), (element, index) => {
      return (
        <div className="  rounded-md p-4  w-full mx-auto" key={index}>
          <div className="animate-pulse flex space-x-4 items-center">
            <div className="rounded-xl bg-slate-700 h-44 w-44"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-4 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-4 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-4 bg-slate-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const tagBagikan = () => {
    return (
      <>
        <div className="mt-4 mb-6 flex items-center">
          <div className="font-bold text-gray-800 mr-4">Bagikan :</div>
          <div className="flex items-center">
            <div className="mx-4">
              <Link
                target="_blank"
                href={`whatsapp://send?text=https://${hostUrl}/berita/${single.slug}`}
              >
                <Image alt="Detakpolitika " src={Wa} width={24} height={30} />
              </Link>
            </div>
            <div className="mx-4">
              <Link
                target="_blank"
                href={`https://twitter.com/intent/tweet/?text=https://${hostUrl}/berita/${single.slug}`}
              >
                <Image alt="Detakpolitika " src={Tw} width={24} height={30} />
              </Link>
            </div>
            <div className="mx-4">
              <Link
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=https://${hostUrl}/berita/${single.slug}`}
              >
                <Image alt="Detakpolitika " src={Fb} width={24} height={30} />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>{single.judul}</title>
        <link rel="icon" href="/logoFull.jpg" />
        <meta
          property="og:site_name"
          content={`Detakpolitika | ${single.judul}`}
        ></meta>

        <meta property="og:title" content={single.judul}></meta>
        <meta property="og:url" content={`${hostUrl}/${single.slug}`}></meta>
        <meta
          property="og:description"
          content={`${single.deskripsi_singkat}`}
        ></meta>
        <meta name="keyword" content={single.keyword} />
        <meta property="og:image" content={STORAGEURL + single.image}></meta>
        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/jpeg" />

        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300"></meta>
        <link itemprop="thumbnailUrl" href={STORAGEURL + single.image} />
        <meta
          property="og:image"
          itemprop="image"
          content={STORAGEURL + single.image}
        />
      </Head>
      <ScrollTop />
      <span itemprop="image" itemscope itemtype="image/jpeg">
        <link itemprop="url" href={STORAGEURL + single.image} />
      </span>
      <div className="md:block hidden sticky bg-white  z-20 top-0 border-b">
        <div className="md:px-32 font-popins">
          <Navbar />
        </div>
      </div>

      <div className="md:hidden sticky z-20 top-0 bg-white">
        <Navmobile />
      </div>
      <div className="px-4 md:px-32 font-popins relative  ">
        {!dataReady || tagSkeleton()}

        <div className="my-4">
          <span>
            <Link href={"/"}>Home</Link> {">"}{" "}
            <Link href={"/kategori?q=" + single.kategori.nama}>
              {single.kategori.nama}
            </Link>
          </span>
        </div>
        <div className="grid grid-flow-row grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8 relative ">
            <div className="=">
              <div className="text-base md:text-3xl font-semibold text-gray-800">
                {single.judul}
              </div>

              <div className="mt-2">
                <div className="text-gray-400">{single.created_at}</div>
                <div className="text-gray-400">
                  Reporter : {single.penulis.name} | Editor : Yoga
                </div>
              </div>
              {tagBagikan()}
            </div>
            <Image
              src={STORAGEURL + single.image}
              alt="Detakpolitik"
              width="900"
              height="900"
              className="rounded-lg"
            />

            <div className="text-gray-400 my-3 text-sm text-center">
              {single.image_ref}
            </div>

            <div className="mt-6">
              <div
                dangerouslySetInnerHTML={{
                  __html: single.body,
                }}
              />
            </div>

            <div className="mt-20">{tagBagikan()}</div>
            <div className="bg-gray-200 border w-full rounded-full"></div>
            <div className="mt-8 flex">
              <div className="text-2xl font-bold text-gray-800">
                Topik Rekomendasi
                <div className=" h-1 mt-2 bg-pink-500 rounded-full block"></div>
              </div>
            </div>
            {/* artikel rekomendasi */}
            {beritaRekomendasi.map((item, index) => {
              return (
                <>
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
                </>
              );
            })}
          </div>

          <div className=" md:col-span-4 col-span-12">
            <div className="font-bold text-xl mb-4">Terbaru</div>
            {BeritaTerbaru.map((item, index) => {
              return (
                <div className="" key={index}>
                  <Terbaru
                    title={
                      item.judul.length >= 70
                        ? item.judul.substring(0, 62) + "..."
                        : item.judul
                    }
                    created_at={item.tanggal_dipublish}
                    kategori={item.kategori.nama}
                    linkBerita={"/berita/" + item.slug}
                    image_url={STORAGEURL + item.image}
                    gap={4}
                  />
                </div>
              );
            })}

            {!SkeletonBeritaTerbaru || tagSkeleton()}
          </div>
        </div>
      </div>

      <div className="mt-32">
        <Footer />
      </div>
    </>
  );
}
