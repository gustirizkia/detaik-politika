import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";
import IG from "../../public/images/ic_ig.png";
import FB from "../../public/images/ic_fb.png";
import Tweet from "../../public/images/ic_tweeter.png";

export default function Footer() {
  return (
    <>
      <hr />
      <div className="md:px-32 px-4">
        <div className="w-52">
          <Image src={logo} layout="responsive" alt="Detakpolitika.com" />
        </div>
      </div>
      <hr />
      <div className="my-10 md:px-32 px-4">
        <div className="flex justify-end">
          <div className="font-bold ">Tentang Kami</div>{" "}
          <span className="font-bold mx-1 md:mx-4">|</span>
          <div className="font-bold">Redaksi</div>
          <span className="font-bold mx-1 md:mx-4">|</span>
          <div className="font-bold">Disclaimer</div>
          <span className="font-bold mx-1 md:mx-4">|</span>
          <div className="font-bold">Peta Situs</div>
        </div>
        <div className="flex justify-end mt-4">
          <div className="font-bold">Kontak</div>
          <span className="font-bold mx-1 md:mx-4">|</span>
          <div className="font-bold">Pedoman Siber</div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="">
            Copyright © 2022{" "}
            <span className="font-bold">detakpolitika.com</span> | All rights
            reserved.
          </div>
          <div className="flex justify-between w-44">
            <div className="w-7">
              <Image src={IG} layout="responsive" alt="Detakpolitika.com" />
            </div>
            <div className="w-7">
              <Image src={FB} layout="responsive" alt="Detakpolitika.com" />
            </div>
            <div className="w-7">
              <Image src={Tweet} layout="responsive" alt="Detakpolitika.com" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
