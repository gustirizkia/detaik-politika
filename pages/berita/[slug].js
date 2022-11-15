import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar";
import Navmobile from "../../components/Navmobile";
import axios from "axios";
import { APIURL, JwtToken } from "../../components/api/base_url";
import Image from "next/image";
import Terbaru from "../../components/Home/Terbaru";
import Wa from "../../public/images/logos_whatsapp-icon.png";
import Tw from "../../public/images/logos_twitter.png";
import Fb from "../../public/images/logos_facebook.png";

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

  // console.log(data);

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
  }, []);

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
            <div className="mr-3">
              <Image src={Wa} width={24} height={30} />
            </div>
            <div className="mr-3">
              <Image src={Tw} width={24} height={30} />
            </div>
            <div className="mr-3">
              <Image src={Fb} width={24} height={30} />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="md:block hidden sticky bg-white  z-20 top-0 border-b">
        <div className="md:px-32 font-popins">
          <Navbar />
        </div>
      </div>

      <div className="px-4 md:px-32 font-popins relative">
        <div className="md:hidden">
          <Navmobile />
        </div>

        {!dataReady || tagSkeleton()}

        <div className="my-4">
          <span>
            Home {">"} {single.kategori.nama}
          </span>
        </div>
        <div className="grid grid-flow-row grid-cols-12 gap-8">
          <div className="col-span-8 relative ">
            <div className="=">
              <div className=" text-3xl font-semibold text-gray-800">
                {single.judul}
              </div>

              <div className="mt-2">
                <div className="text-gray-400">{single.created_at}</div>
                <div className="text-gray-400">
                  Reporter : Aldo | Editor : Yoga
                </div>
              </div>
              {tagBagikan()}
            </div>
            <Image
              src={single.image}
              alt="Detakpolitik"
              width="900"
              height="900"
              className="rounded-lg"
            />

            <div className="mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
              aliquid repudiandae culpa saepe quaerat vitae sapiente. Doloribus
              at culpa aliquid eaque error quia iure in illum cumque adipisci,
              ipsa veritatis maxime quis provident sint, esse quos, inventore
              ipsum corrupti? Placeat ipsam quibusdam cumque iste, corporis
              debitis omnis quo minus. Eveniet odit possimus qui, doloremque
              magni ea tenetur harum maiores culpa cupiditate ducimus eligendi
              voluptatibus ex mollitia vel doloribus quis laboriosam voluptate
              totam voluptatem, commodi incidunt. Quam hic iure harum quisquam
              et recusandae! Nisi obcaecati id impedit voluptatem ea esse, sit
              suscipit necessitatibus illum eum veritatis a laboriosam dicta
              vitae vero possimus blanditiis illo non ratione voluptas maxime
              maiores. Dolorem totam ad consectetur id est tenetur eligendi
              repellendus porro odio, reiciendis, unde sit praesentium ipsa enim
              at! Nobis enim ratione eum libero hic porro. Incidunt, corporis.
              Sint quas voluptatem laudantium corrupti officiis quisquam, dicta
              libero officia illo voluptate! Ex beatae, animi id saepe quam
              possimus unde suscipit tempore molestiae sed, voluptate mollitia
              in ipsum numquam nostrum ab sapiente pariatur blanditiis aut?
              Harum nesciunt illum ducimus numquam. Sed maiores, sit, facilis
              eius reiciendis dolore quo neque obcaecati veniam, soluta fugiat
              possimus excepturi eos aliquam labore id error veritatis odit
              voluptatem eaque? Eius?
            </div>

            <div className="mt-20">{tagBagikan()}</div>
          </div>

          <div className="col-span-4">
            <div className="font-bold text-xl mb-4">Terbaru</div>
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
    </>
  );
}
