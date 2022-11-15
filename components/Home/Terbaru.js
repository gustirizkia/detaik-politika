import React from "react";
import dummy from "../../public/images/anis.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Terbaru({
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
      <div className={`grid grid-flow-row grid-cols-12 mb-8 gap-4`}>
        <div className="col-span-6 ">
          <div className="flex items-center">
            <div className="w-full rounded-xl h-40 relative">
              <Link href={linkBerita}>
                <Image
                  src={image_url}
                  alt="Detakpolitik"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl block"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-6 my-auto">
          <Link href={linkBerita}>
            <div className="text-gray-800 font-semibold ">{title}</div>
            <div className="text-pink-500 text-sm mt-2 font-medium">
              {kategori}
            </div>
          </Link>
        </div>
      </div>
      {/* end Berita utama */}
    </>
  );
}
