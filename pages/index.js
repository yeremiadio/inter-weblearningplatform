// import { Button } from "@chakra-ui/react";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";
function Home() {
  return (
    <>
      <section className="container mx-auto p-4 lg:px-2 mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center">
          <div className="lg:pr-16">
            <h3 className="text-darkblue-inter font-bold text-4xl leading-tight my-4">
              Platform Belajar Pemrograman Web #1 buat kamu yang pengen jadi web
              programmer
            </h3>
            <p className="text-darkblue-inter text-opacity-50 text-base leading-relaxed my-4">
              Inter merupakan platform pembelajaran pemrograman web yang
              interaktif. Kamu akan belajar banyak mengenai fundamental
              pemrograman web HTML, CSS dan Javascript.
            </p>
            <Link href={"login"}>
              <a>
                <button className="py-3 px-8 bg-blue-inter transition-all delay-75 hover:bg-blue-600 rounded-md text-white font-bold my-2">
                  Mulai Sekarang
                </button>
              </a>
            </Link>
          </div>
          <div className="w-full">
            <img className="w-full h-1/6" src={"/ilustrasi-1.svg"} />
          </div>
        </div>
      </section>
      <section className="container mx-auto p-4 lg:px-2 mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center">
          <div className="w-full">
            <img className="w-full h-1/6" src={"/group-img-1.svg"} />
          </div>
          <div className="lg:pr-16">
            <span className="text-blue-inter text-base font-bold my-4">
              Belajar menjadi lebih mudah
            </span>
            <h3 className="text-darkblue-inter font-bold text-4xl leading-tight my-4">
              Menyajikan konten pembelajaran langsung dari guru ahli di
              bidangnya
            </h3>
            <p className="text-darkblue-inter text-opacity-50 text-base leading-relaxed my-4">
              Platform Inter memberikan fitur yang mana guru dapat memberikan{" "}
              <b>materi pembelajaran</b> kepada siswanya yakni menggabungkan
              materi berupa text dan video.
            </p>
            <Link href={"login"}>
              <a>
                <button className="py-3 px-8 bg-blue-inter bg-opacity-10 transition-all delay-75 hover:bg-opacity-20 rounded-md text-blue-inter font-bold my-2">
                  Lihat Materi
                </button>
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section className="container mx-auto p-4 lg:px-2 mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center">
          <div className="lg:pr-16">
            <span className="text-blue-inter text-base font-bold my-4">
              Asah kemampuan codingmu
            </span>
            <h3 className="text-darkblue-inter font-bold text-4xl leading-tight my-4">
              Mengerjakan tugas secara langsung melalui platform
            </h3>
            <p className="text-darkblue-inter text-opacity-50 text-base leading-relaxed my-4">
              Salah satu fitur yang terdapat dalam platform Inter adalah
              penugasan. Fitur ini terdapat <b>kuis interaktif dan esai</b> yang
              memberi kemudahan bagi siswa dalam mengerjakan tugas.
            </p>
            <Link href={"login"}>
              <a>
                <button className="py-3 px-8 bg-blue-inter bg-opacity-10 transition-all delay-75 hover:bg-opacity-20 rounded-md text-blue-inter font-bold my-2">
                  Lihat Penugasan
                </button>
              </a>
            </Link>
          </div>
          <div className="w-full mt-4 lg:mt-0">
            <img className="w-full h-1/6" src={"/ilus-game-popcorn.svg"} />
          </div>
        </div>
      </section>
      <section className="container mx-auto p-4 lg:px-2 mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center">
          <div className="w-full">
            <img className="w-full h-1/6" src={"/group-img-2.svg"} />
          </div>
          <div className="lg:pr-16">
            <span className="text-blue-inter text-base font-bold my-4">
              Belajar sambil bermain
            </span>
            <h3 className="text-darkblue-inter font-bold text-4xl leading-tight my-4">
              Mengerjakan tugas secara langsung melalui platform
            </h3>
            <p className="text-darkblue-inter text-opacity-50 text-base leading-relaxed my-4">
              Keunggulan dari Inter ini sendiri yakni terdapat fitur{" "}
              <b>Code Playground</b> dimana fitur ini memberikan kemudahan bagi
              pengguna untuk mengerjakan kode yang pengerjaannya dapat langsung
              disimpan dalam aplikasi.
            </p>
            <Link href={"login"}>
              <a>
                <button className="py-3 px-8 bg-blue-inter bg-opacity-10 transition-all delay-75 hover:bg-opacity-20 rounded-md text-blue-inter font-bold my-2">
                  Coba Code Playground
                </button>
              </a>
            </Link>
          </div>
        </div>
      </section>
      <section className="mb-36 bg-darkblue-inter overflow-hidden relative">
        <div className="rounded-full h-40 w-40 lg:h-56 lg:w-56 bg-blue-inter absolute -top-32 -left-10" />
        <div className="rounded-full h-40 w-40 lg:h-56 lg:w-56 bg-blue-inter absolute -bottom-32 -right-10" />
        <div className="container mx-auto p-4 lg:px-2">
          <div className="flex items-center justify-center flex-col gap-4 py-14">
            <h3 className="font-bold text-white text-2xl">
              Tertarik belajar di Inter?
            </h3>
            <Link href={"register"}>
              <a>
                <button className="py-3 px-8 bg-white hover:bg-gray-100 transition-all delay-75 rounded-md text-darkblue-inter font-bold my-2">
                  Daftar Sekarang
                </button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

Home.layout = MainLayout;

export default Home;
