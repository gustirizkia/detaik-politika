import Head from "next/head";
import Link from "next/link";
import LogoFull from "../public/logoFull.jpg";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>404 | Detakpolitika</title>
        <link rel="icon" href="/logoFull.jpg" />
        <meta
          name="keywords"
          content="berita hari ini, berita harian, berita terkini, berita terbaru, berita indonesia, berita terpopuler, berita, info terkini, berita dunia, peristiwa hari ini"
        ></meta>
        <meta property="og:title" content={"DETAK POLITIKA "} />
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
      <div class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div class="bg-[#FF6A3D] text-white px-2 text-base font-bold rounded rotate-12 absolute">
          Halam Tidak Ada
        </div>
        <div class="mt-5">
          <Link href="/">
            <div class="relative inline-block text-sm font-medium text-pink-500 group active:text-pink-500 focus:outline-none focus:ring">
              <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-pink-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
                Kembali
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
