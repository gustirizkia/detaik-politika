import React from "react";
import dummy from "../../public/images/anis.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Berita({
  title,
  created_at,
  kategori,
  linkBerita,
  image_url,
  gap,
}) {
  return (
    <>
      {/* Berita utama */}
      <Link href={linkBerita}>
        <div
          className={`md:grid grid-flow-row grid-cols-12 mb-8 gap-4 md:gap-10`}
        >
          <div className="col-span-4 ">
            <div className="flex items-center">
              <div className="w-full rounded-xl h-44 relative">
                <Image
                  src={image_url}
                  alt="Detakpolitik"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
          <div className="col-span-7 my-auto">
            <div className="text-gray-400 text-sm mb-2">{created_at}</div>
            <div className="text-gray-800 font-semibold text-xl ">{title}</div>
            <div className="text-pink-500 text-sm mt-2 font-medium">
              {kategori}
            </div>
            <div className="bg-gray-800 text-white px-2 py-1  inline-block rounded-lg text-xs mt-2 ">
              Baca Selengkapnya
            </div>
          </div>
        </div>
      </Link>
      {/* end Berita utama */}
    </>
  );
}
