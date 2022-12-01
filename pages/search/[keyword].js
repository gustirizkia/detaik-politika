import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { APIURL, JwtToken, STORAGEURL } from "../../components/api/base_url";
import Berita from "../../components/Home/Berita";
import Navbar from "../../components/navbar";
import Navmobile from "../../components/Navmobile";

export default function CariPage() {
  const router = useRouter();
  const { keyword } = router.query;
  const [BeritaUtama, setBeritaUtama] = useState([]);
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const fetchData = () => {
    setLoadSkeleton(true);
    axios
      .get(APIURL + "artikel?keyword=" + keyword, {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        setBeritaUtama(ress.data.data.data);
        setLoadSkeleton(false);
      })
      .catch((err) => {
        console.log("ada error", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [keyword]);

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

  const tagBerita = () => {
    return (
      <>
        {BeritaUtama.map((item, index) => {
          return (
            <div className="" key={index}>
              <Berita
                title={item.judul}
                created_at={item.tanggal}
                kategori={item.kategori.nama}
                linkBerita={"/berita/" + item.slug}
                image_url={STORAGEURL + item.image}
                gap="10"
              />
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="md:block hidden sticky bg-white  z-20 top-0 ">
        <div className="md:px-32 font-popins">
          <Navbar />
        </div>
      </div>

      <div className="px-4 md:px-32 font-popins relative">
        <div className="md:hidden">
          <Navmobile />
        </div>

        <div className="my-10">
          <div className="md:grid grid-flow-row grid-cols-2 md:grid-cols-12 gap-10">
            <div className="col-span-12 md:col-span-8">
              <div className="mb-8">
                <div className="text-2xl font-bold text-gray-800">
                  Hasil Pencarian Untuk “{keyword}”
                </div>
              </div>
              {loadSkeleton || tagBerita()}
              {!loadSkeleton || tagSkeleton()}

              {/* <div className="flex">
                <div
                  className="text-center cursor-pointer text-pink-500 border-2 border-pink-500 rounded-full px-4 py-2 inline-block mx-auto"
                  // onClick={handleLoadMore}
                >
                  Load more
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
