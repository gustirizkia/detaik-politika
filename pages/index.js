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
import { APIURL, JwtToken } from "../components/api/base_url";

export default function Home() {
  const [BeritaTerbaru, setBeritaTerbaru] = useState([]);
  const [Populer, setPopuler] = useState([]);
  const [BeritaUtama, setBeritaUtama] = useState([]);
  const [limitBerita, setLimitBerita] = useState(1);
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  const [heightArtikel, setHeightArtikel] = useState(566);
  const [SkeletonBeritaTerbaru, setSkeletonBeritaTerbaru] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, false);
  });

  const handleScroll = () => {
    const position = window.pageYOffset;

    if (position >= 1632 && heightArtikel === 566) {
    }
  };

  const handleCek = () => {
    setHeightArtikel(heightArtikel * 2);
  };

  useEffect(() => {
    handleBeritaTerbaru();
    hendleFetchPopuler();
    handleBeritaUtama();
  }, [limitBerita]);

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
        // console.log(ress.data.data.data);
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
        console.log(ress.data.data.data);
        ress.data.data.data.forEach((element) => {
          setBeritaUtama((BeritaUtama) => [...BeritaUtama, element]);
        });

        setHeightArtikel(heightArtikel * 2);

        setLoadSkeleton(false);
        // setBeritaUtama(ress.data.data.data);
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

  return (
    <>
      <Head>
        <title>Detak Politika | Nasional</title>
        <link rel="icon" href="/logo.png" />
        <meta
          name="keywords"
          content="berita hari ini, berita harian, berita terkini, berita terbaru, berita indonesia, berita terpopuler, berita, info terkini, berita dunia, peristiwa hari ini"
        ></meta>
        <meta property="og:title" content="DETAK POLITIKA | Melangkah Maju" />
        <meta
          name="description"
          content="detakpolitik.com - Kabar terbaru hari ini Indonesia dan Dunia, Kabar terkini news, peristiwa, ekonomi, hukum"
        ></meta>
        <meta property="og:image" content={Logo.src} />
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
        <div className="md:hidden">
          <Navmobile />
        </div>

        <div className="mt-10">
          <div className="md:grid grid-flow-row grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-8 relative rounded-xl overflow-hidden">
              <Image src={dummy} layout="responsive" alt="Anis Baswedan" />
              <div className="bg-gray-900 md:absolute bottom-0 px-4 py-4 text-white font-popins w-full">
                <div className="text-xl underline">
                  Deklarasi Relawan Anies Presiden 2024
                </div>
                <div className="text-pink-500">Politik</div>
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
                          <div className="font-semibold leading-none">
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
              <div className="col-span-12 md:col-span-8">
                <div className="mb-8">
                  <div className="text-2xl font-bold text-gray-800">
                    Berita Utama
                  </div>
                  <div className="w-full h-1 mt-2 bg-pink-500 rounded-full block"></div>
                </div>
                {BeritaUtama.map((item, index) => {
                  return (
                    <div className="" key={index}>
                      <Berita
                        title={item.judul}
                        created_at={item.tanggal}
                        kategori={item.kategori.nama}
                        linkBerita={"/berita/" + item.slug}
                        image_url="https://via.placeholder.com/640x480.png"
                        gap="10"
                      />
                    </div>
                  );
                })}
                {!loadSkeleton || tagSkeleton()}

                <div className="flex">
                  <div
                    className="text-center cursor-pointer text-pink-500 border-2 border-pink-500 rounded-full px-4 py-2 inline-block mx-auto"
                    onClick={handleLoadMore}
                  >
                    Load more
                  </div>
                </div>
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
                        title={item.judul}
                        created_at={item.tanggal_dipublish}
                        kategori={item.kategori.nama}
                        linkBerita={"/berita/" + item.slug}
                        image_url="https://via.placeholder.com/640x480.png"
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
              <div className="col-span-6">
                <div className="text-2xl font-bold text-gray-800">Gallery</div>
                <div className="w-full h-1 mt-2 bg-pink-500 rounded-full block"></div>
                <div className="bg-gray-800 p-8 text-white mt-8 rounded-xl">
                  <div className="grid grid-flow-row grid-cols-12 gap-6">
                    <div className="col-span-6">
                      <Image
                        src={dummy}
                        width={600}
                        height={600}
                        className="rounded-lg"
                      />
                      <div className="font-semibold mt-3 underline">
                        Putin Dipastikan Tak Hadir di KTT G20 Bali, Bahlil
                        Ingatkan Jangan Terbuai Ekonomi Tumbuh
                      </div>
                    </div>
                    <div className="col-span-6">
                      <Image
                        src={dummy}
                        width={600}
                        height={600}
                        className="rounded-lg"
                      />
                      <div className="font-semibold mt-3 underline">
                        Putin Dipastikan Tak Hadir di KTT G20 Bali, Bahlil
                        Ingatkan Jangan Terbuai Ekonomi Tumbuh
                      </div>
                    </div>
                    <div className="col-span-6">
                      <Image
                        src={dummy}
                        width={600}
                        height={600}
                        className="rounded-lg"
                      />
                      <div className="font-semibold mt-3 underline">
                        Putin Dipastikan Tak Hadir di KTT G20 Bali, Bahlil
                        Ingatkan Jangan Terbuai Ekonomi Tumbuh
                      </div>
                    </div>
                    <div className="col-span-6">
                      <Image
                        src={dummy}
                        width={600}
                        height={600}
                        className="rounded-lg"
                      />
                      <div className="font-semibold mt-3 underline">
                        Putin Dipastikan Tak Hadir di KTT G20 Bali, Bahlil
                        Ingatkan Jangan Terbuai Ekonomi Tumbuh
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6">
                <div className="text-2xl font-bold text-gray-800">Video</div>
                <div className="w-full h-1 mt-2 bg-pink-500 rounded-full block"></div>
                <div className="bg-gray-800 p-8 text-white mt-8 rounded-xl">
                  <div className="grid grid-flow-row grid-cols-12 gap-6">
                    <div className="col-span-6">
                      <iframe
                        id="ytplayer"
                        className="rounded-lg"
                        type="text/html"
                        width="100%"
                        src={`https://www.youtube.com/embed/PG8DIp-MQ3M?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                        frameborder="0"
                      ></iframe>
                    </div>

                    <div className="col-span-6 flex items-center">
                      <div className="font-semibold">
                        Anies Baswedan Bicara soal Partai Politik dan Misi yang
                        Harus Dilaksanakan
                        <div className="text-pink-500">Politik</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-lg font-bold text-white">
                      Video Terbaru
                    </div>
                    <div className="w-full h-1 mt-2 bg-pink-500 rounded-full block"></div>

                    <div className="mt-3 bg-white p-4 inline-block rounded-lg">
                      <iframe
                        id="ytplayer"
                        className=""
                        type="text/html"
                        width="auto"
                        src={`https://www.youtube.com/embed/PG8DIp-MQ3M?autoplay=0&origin=http://example.com&controls=0&rel=1`}
                        frameborder="0"
                      ></iframe>
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
                <Image src={dummy} layout="responsive" alt="Anis Baswedan" />
                <div className="bg-gray-900 md:absolute bottom-0 px-4 py-4 text-white font-popins w-full">
                  <div className="text-xl underline">
                    Deklarasi Relawan Anies Presiden 2024
                  </div>
                  <div className="text-pink-500">Politik</div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4">
                <div className="grid grid-flow-row grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <div className="w-full rounded-xl h-44 relative">
                      <Image
                        src={dummy}
                        alt="Detakpolitik"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-6 col-span-6 flex items-center">
                    <div className="text-lg font-semibold text-gray-900">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Natus.
                    </div>
                  </div>
                </div>
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
              <div className="md:col-span-4 col-span-6">
                <div className="w-full rounded-xl h-24 md:h-60 relative">
                  <Image
                    src={dummy}
                    alt="Detakpolitik"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
                <div className="md:text-lg font-medium md:font-bold underline mt-4  ">
                  Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit.
                </div>
              </div>
              <div className="md:col-span-4 col-span-6">
                <div className="w-full rounded-xl h-24 md:h-60 relative">
                  <Image
                    src={dummy}
                    alt="Detakpolitik"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
                <div className="md:text-lg font-medium md:font-bold underline mt-4  ">
                  Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit.
                </div>
              </div>
              <div className="md:col-span-4 col-span-6">
                <div className="w-full rounded-xl h-24 md:h-60 relative">
                  <Image
                    src={dummy}
                    alt="Detakpolitik"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
                <div className="md:text-lg font-medium md:font-bold underline mt-4  ">
                  Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit.
                </div>
              </div>
              <div className="md:col-span-4 col-span-6">
                <div className="w-full rounded-xl h-24 md:h-60 relative">
                  <Image
                    src={dummy}
                    alt="Detakpolitik"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
                <div className="md:text-lg font-medium md:font-bold underline mt-4  ">
                  Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit.
                </div>
              </div>
              <div className="md:col-span-4 col-span-6">
                <div className="w-full rounded-xl h-24 md:h-60 relative">
                  <Image
                    src={dummy}
                    alt="Detakpolitik"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
                <div className="md:text-lg font-medium md:font-bold underline mt-4  ">
                  Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit.
                </div>
              </div>
              <div className="md:col-span-4 col-span-6">
                <div className="w-full rounded-xl h-24 md:h-60 relative">
                  <Image
                    src={dummy}
                    alt="Detakpolitik"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
                <div className="md:text-lg font-medium md:font-bold underline mt-4  ">
                  Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit.
                </div>
              </div>
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
