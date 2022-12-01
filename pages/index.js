import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import dummy from "../public/images/anis.jpg";
import Navbar from "../components/navbar";
import BeritaUtama from "../components/Home/BeritaUtama";
import { useEffect, useState } from "react";
import axios from "axios";
import Berita from "../components/Home/Berita";
import Terbaru from "../components/Home/Terbaru";
import Footer from "../components/Home/Footer";
import Navmobile from "../components/Navmobile";
import Logo from "../public/logo.png";
import LogoFull from "../public/logoFull.jpg";
import { APIURL, JwtToken, STORAGEURL } from "../components/api/base_url";
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css";
import { Splide, SplideSlide } from "splide-nextjs/react-splide";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [BeritaTerbaru, setBeritaTerbaru] = useState([]);
  const [Populer, setPopuler] = useState([]);
  const [BeritaUtama, setBeritaUtama] = useState([]);
  const [GalleryData, setGalleryData] = useState([]);
  const [limitBerita, setLimitBerita] = useState(1);
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  const [heightArtikel, setHeightArtikel] = useState(566);
  const [SkeletonBeritaTerbaru, setSkeletonBeritaTerbaru] = useState(true);
  const [BeritaRekomendasi, setBeritaRekomendasi] = useState([]);
  const [BeritaPolitik, setPolitik] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const [tempData, setTempData] = useState([]);
  const [videoPertama, setVideoPertama] = useState({});
  const [listVideo, setListVideo] = useState([]);

  useEffect(() => {
    handleBeritaUtama();
  }, [limitBerita]);

  useEffect(() => {
    handleBeritaTerbaru();
    hendleFetchPopuler();
    handleGallery();
    handleBeritaRekomendasi();
    handlePolitik();
    handleVideo();
  }, []);

  const handleVideo = () => {
    axios
      .get(APIURL + "video-list", {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        console.log("data video", ress.data);
        setVideoPertama(ress.data.pertama);
        setListVideo(ress.data.list);
      });
  };

  const handlePolitik = () => {
    axios
      .get(APIURL + "artikel/politik", {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        setPolitik(ress.data);
      });
  };

  const handleBeritaRekomendasi = () => {
    axios
      .get(APIURL + "artikel/rekomendasi", {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        setBeritaRekomendasi(ress.data.data);
      });
  };

  const hendleFetchPopuler = () => {
    axios
      .get(APIURL + "artikel-paling-banyak-view", {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        setPopuler(ress.data.data);
      });
  };

  const handleBeritaUtama = () => {
    axios
      .get(APIURL + "artikel?page=" + limitBerita, {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        console.log("berita utama", ress.data);
        setBeritaUtama(ress.data.data.data);
        setLoadSkeleton(false);
      })
      .catch((err) => {
        setLoadSkeleton(false);
      });
  };

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

  const handleGallery = () => {
    axios.get(APIURL + "gallery").then((ress) => {
      setGalleryData(ress.data.data);
    });
  };

  const handleLoadMore = () => {
    setLoadSkeleton(true);

    let addLimit = limitBerita + 1;
    axios
      .get(APIURL + "artikel?page=" + addLimit, {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        // console.log("Handle load more runn");
        // console.log(ress.data.data.current_page >= ress.data.data.last_page);

        ress.data.data.data.forEach((element) => {
          setBeritaUtama((BeritaUtama) => [...BeritaUtama, element]);
        });

        setHeightArtikel(heightArtikel * 2);

        setLoadSkeleton(false);
        // setBeritaUtama(ress.data.data.data);
        if (ress.data.data.current_page >= ress.data.data.last_page) {
          setShowLoadMore(false);
        }
      })
      .catch((err) => {
        setLoadSkeleton(false);
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

  var settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    height: "100px",
  };
  var settingsVideo = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    height: "100px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Detak Politika | Nasional</title>
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

      <div className="md:block hidden sticky bg-white  z-20 top-0 border-b">
        <div className="md:px-32 font-popins">
          <Navbar />
        </div>
      </div>
      <div className="px-4 md:px-32 font-popins relative">
        <div className="md:hidden sticky z-20 top-0 bg-white">
          <Navmobile />
        </div>

        <div className="mt-6 md:mt-10">
          <div className="md:grid grid-flow-row grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-8 relative rounded-xl md:overflow-hidden">
              <div className=" md:block">
                <Slider {...settings}>
                  {BeritaTerbaru.map((item, index) => {
                    return (
                      <Link href={"/berita/" + item.slug}>
                        <div key={index}>
                          <div className="md:h-96 h-40">
                            <Image
                              src={`${STORAGEURL}${item.image}`}
                              width="1000"
                              height="1000"
                              alt="Detak Politika"
                              className="object-cover object-center"
                            />
                          </div>
                          <div className="bg-gray-900 md:absolute md:bottom-0 px-4 py-4 text-white font-popins w-full rounded-b-xl md:block hidden">
                            <div className="md:text-xl text-sm underline">
                              {item.judul}
                            </div>
                            <div className="text-pink-500">
                              {item.kategori.nama}
                            </div>
                          </div>
                          <div className="bg-gray-900 relative px-4 py-4 z-10 md:hidden">
                            <div className="md:text-xl text-sm underline text-white">
                              {item.judul}
                            </div>
                            <div className="text-pink-500">
                              {item.kategori.nama}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 mt-8 md:mt-0">
              <div className="text-2xl font-bold text-gray-800">Terpopuler</div>
              <div className="w-full h-1 mt-2 bg-pink-500 rounded-full"></div>
              {Populer.map((item, index) => {
                return (
                  <div key={index}>
                    <Link href={`/berita/${item.slug}`}>
                      <div className="mt-4 flex justify-start items-center">
                        <div className="text-pink-500 font-bold text-4xl underline italic mr-5 leading-none">
                          {index + 1}
                        </div>
                        <div className="my-auto">
                          <div className="font-semibold leading-none hover:text-pink-500">
                            {item.judul}
                          </div>
                          <div className="text-pink-500 text-sm">
                            {item.kategori.nama}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Berita utama */}
          <div className="my-10">
            <div className="md:grid grid-flow-row grid-cols-2 md:grid-cols-12 gap-10">
              <div className="col-span-12 md:col-span-8 ">
                <div className="mb-8">
                  <div className="text-2xl font-bold text-gray-800">
                    Berita Utama
                  </div>
                  <div className="w-full h-1 mt-2 bg-pink-500 rounded-full block"></div>
                </div>
                <div className="berita-utama-list">
                  {BeritaUtama.map((item, index) => {
                    return (
                      <div className="berita-utama" key={index}>
                        <Berita
                          title={item.judul}
                          created_at={item.tanggal}
                          kategori={item.kategori.nama}
                          linkBerita={"/berita/" + item.slug}
                          image_url={`${STORAGEURL}${item.image}`}
                          gap="10"
                        />
                      </div>
                    );
                  })}
                </div>
                {!loadSkeleton || tagSkeleton()}

                {!showLoadMore || (
                  <div className="flex">
                    <div
                      className="text-center cursor-pointer text-pink-500 border-2 border-pink-500 rounded-full px-4 py-2 inline-block mx-auto"
                      onClick={handleLoadMore}
                    >
                      Load more
                    </div>
                  </div>
                )}
              </div>
              <div className="col-span-12 md:col-span-4">
                <div className="mb-8">
                  <div className="text-2xl font-bold text-gray-800">
                    Terbaru
                  </div>
                  <div className="w-full h-1 mt-2 bg-pink-500 rounded-full block"></div>
                </div>
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
                        image_url={`${STORAGEURL}${item.image}`}
                        gap={4}
                      />
                    </div>
                  );
                })}

                {!SkeletonBeritaTerbaru || tagSkeleton()}
              </div>
            </div>
          </div>
          {/* end Berita utama */}
          {/* Gallery dan Video */}
          <div className="mb-8">
            <div className="grid grid-flow-row grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-6">
                <div className="text-2xl font-bold text-gray-800">Gallery</div>
                <div className="w-full h-1 mt-2 bg-pink-500 rounded-full block"></div>
                <div className="bg-gray-800 p-8 text-white mt-8 rounded-xl">
                  <div className="grid grid-flow-row grid-cols-12 gap-6">
                    {GalleryData.map((item, index) => {
                      return (
                        <div className="col-span-12 md:col-span-6" key={index}>
                          <Image
                            src={`${STORAGEURL}${item.image}`}
                            width={600}
                            height={400}
                            className="rounded-lg"
                          />
                          <div className="md:font-semibold font-medium mt-3 underline">
                            {item.nama}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="text-2xl font-bold text-gray-800">Video</div>
                <div className="w-full h-1 mt-2 bg-pink-500 rounded-full block"></div>
                <div className="bg-gray-800 p-8 text-white mt-8 rounded-xl">
                  <div className="grid grid-flow-row grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-6">
                      <iframe
                        id="ytplayer"
                        className="rounded-lg"
                        type="text/html"
                        width="100%"
                        src={`https://www.youtube.com/embed/${videoPertama.link}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                        frameborder="0"
                      ></iframe>
                    </div>

                    <div className="col-span-12 md:col-span-6 flex items-center">
                      <div className="font-semibold">
                        {videoPertama.nama}
                        {/* <div className="text-pink-500">Politik</div> */}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-lg font-bold text-white">
                      Video Terbaru
                    </div>
                    <div className="w-full h-1 mt-2 bg-pink-500 rounded-full block"></div>
                    <div className="">
                      <Slider {...settingsVideo}>
                        {listVideo.map((item, index) => {
                          return (
                            <div className="mx-20 px-1" key={index}>
                              <div className="mt-3 bg-white p-4 inline-block rounded-lg ">
                                <iframe
                                  id="ytplayer"
                                  className=""
                                  type="text/html"
                                  width="100%"
                                  src={`https://www.youtube.com/embed/${item.link}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                                  frameborder="0"
                                ></iframe>
                              </div>
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Gallery dan Video */}

          {/* Rekomendasi */}
          <div className="my-10">
            <div className="mb-8">
              <div className="text-2xl font-bold text-gray-800">
                Rekomendasi
              </div>
              <div className="w-full h-1 mt-2 bg-pink-500 rounded-full block"></div>
            </div>
            <div className="grid grid-flow-row grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-8 relative rounded-xl overflow-hidden">
                {BeritaRekomendasi.length > 0 ? (
                  <>
                    <Link href={"/berita/" + BeritaRekomendasi[0].slug}>
                      <Image
                        src={STORAGEURL + BeritaRekomendasi[0].image}
                        layout="responsive"
                        width={300}
                        height={300}
                        alt={BeritaRekomendasi[0].judul}
                      />
                      <div className="bg-gray-900 md:absolute bottom-0 px-4 py-4 text-white font-popins w-full">
                        <div className="text-xl underline">
                          {BeritaRekomendasi[0].judul}
                        </div>
                        <div className="text-pink-500">
                          {BeritaRekomendasi[0].kategori.nama}
                        </div>
                      </div>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-span-12 md:col-span-4">
                {BeritaRekomendasi.slice(0, 3).map((item) => {
                  return (
                    <>
                      {BeritaRekomendasi[0].id !== item.id ? (
                        <>
                          <Link href={"/berita/" + item.slug}>
                            <div className="grid grid-flow-row grid-cols-12 gap-4 mb-4">
                              <div className="col-span-6">
                                <div className="w-full rounded-xl h-44 relative">
                                  <Image
                                    src={STORAGEURL + item.image}
                                    alt="Detakpolitik"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-xl"
                                  />
                                </div>
                              </div>

                              <div className="md:col-span-6 col-span-6 flex items-center">
                                <div className="text-lg font-semibold text-gray-900">
                                  {item.judul}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          {/* endrekomendasi */}
          {/* Berita politik */}
          <div className="my-10">
            <div className="mb-8">
              <div className="text-2xl font-bold text-gray-800">
                Berita Politik
              </div>
              <div className="w-full h-1 mt-2 bg-pink-500 rounded-full block"></div>
            </div>

            <div className="grid grid-flow-row grid-cols-12 gap-8">
              {BeritaPolitik.map((item) => {
                return (
                  <>
                    <div className="md:col-span-4 col-span-6">
                      <Link href={"/berita/" + item.slug}>
                        <div className="w-full rounded-xl h-24 md:h-60 relative">
                          <Image
                            src={STORAGEURL + item.image}
                            alt="Detakpolitik"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="md:text-lg font-medium md:font-bold underline mt-4  ">
                          {/* {item.judul} */}
                          {item.judul}
                        </div>
                      </Link>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          {/* endBerita Politik */}
        </div>
      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </>
  );
}
