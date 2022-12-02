import Link from "next/link";

export default function Custom500() {
  return (
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
  );
}
