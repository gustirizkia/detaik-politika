import React from "react";
import dummy from "../../public/images/anis.jpg";
import Image from "next/image";

export default function BeritaUtama() {
  return (
    <>
      {/* Berita utama */}
      <div className="grid grid-flow-row grid-cols-12 gap-10 ">
        <div className="col-span-12">
          <div className="text-2xl font-bold text-gray-800">Terpopuler</div>
          <div className="w-full h-1 mt-2 bg-pink-500 rounded-full block"></div>
          <div className="flex items-center mt-8">
            <div className="w-60  rounded-xl h-40 relative">
              <Image
                src={dummy}
                alt="Detakpolitik"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <div className="ml-4">
              <div className="text-gray-400 text-sm mb-2">2 Jam yang lalu</div>
              <div className="text-gray-800 font-semibold text-xl ">
                Demokrat Harap Anies Minta Kejelasan KPK soal Kasus Formula E
              </div>
              <div className="text-pink-500 text-sm mt-2 font-medium">
                Politik
              </div>
              <div className="bg-gray-800 text-white px-2 py-1  inline-block rounded-lg text-xs mt-2 ">
                Baca Selengkapnya
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end Berita utama */}
    </>
  );
}
