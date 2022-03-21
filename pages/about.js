import { CheckCircleIcon } from "@heroicons/react/solid";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";
function about() {
  return (
    <>
      <section className="container mx-auto p-4 lg:px-2 lg:my-28 mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center">
          <div className="lg:pr-16">
            <h3 className="text-darkblue-inter font-bold text-4xl leading-tight my-4">
              Tentang Inter
            </h3>
            <p className="text-darkblue-inter text-opacity-50 text-base leading-relaxed my-4">
              Inter merupakan aplikasi e-Learning berbasis web yang dapat
              membantu pengguna dalam belajar Pemrograman Web. Platform ini
              menyediakan berbagai fitur macam yang akan menunjang para pengguna
              selama belajar 3 komponen utama dalam pembuatan sebuah website,
              yakni HTML, CSS dan Javascript
            </p>
            <Link href={"register"}>
              <a>
                <button className="py-3 px-8 bg-blue-inter transition-all delay-75 hover:bg-blue-600 rounded-md text-white font-bold my-2">
                  Mulai Sekarang
                </button>
              </a>
            </Link>
          </div>
          <div className="w-full mt-6 lg:mt-0">
            <img className="w-full h-1/6" src={"/ilus-laptop-1.svg"} />
          </div>
        </div>
      </section>
      <section className="container mx-auto p-4 lg:px-2 mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center">
          <div className="w-full">
            <img className="h-1/6 w-11/12" src={"/group-img-3.svg"} />
          </div>
          <div className="lg:pr-16">
            <span className="text-blue-inter text-base font-bold my-4">
              Fitur - fitur unggulan inter
            </span>
            <h3 className="text-darkblue-inter font-bold text-4xl leading-tight my-4">
              Menyediakan banyak fitur untuk membantu kamu belajar pemrograman
              web
            </h3>
            <p className="text-darkblue-inter text-opacity-50 text-base leading-relaxed my-4">
              Inter menyediakan fitur - fitur yang memberikan kemudahan serta
              dapat meningkatkan <b>efektivitas</b> pembelajaran pemrograman web
              karena dapat diakses diberbagai perangkat.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 space-y-3 md:space-y-0">
              <div className="flex flex-col gap-4">
                {[
                  "Materi Pembelajaran",
                  "Frontend Editor",
                  "Javascript Editor",
                ].map((item) => (
                  <div className="flex gap-3 w-full" key={item}>
                    <CheckCircleIcon className="text-green-500 w-6 h-6" />
                    <span className="text-base text-darkblue-inter text-opacity-50">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {["Kuis Interaktif", "Penugasan Esai", "Kelola Pengguna"].map(
                  (item) => (
                    <div className="flex gap-3 w-full" key={item}>
                      <CheckCircleIcon className="text-green-500 w-6 h-6" />
                      <span className="text-base text-darkblue-inter text-opacity-50">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
            {/* <button className="py-3 px-8 bg-blue-inter bg-opacity-10 transition-all delay-75 hover:bg-opacity-20 rounded-md text-blue-inter font-bold my-2">
              Coba Code Playground
            </button> */}
          </div>
        </div>
      </section>
      <section className="mb-36 bg-darkblue-inter overflow-hidden relative">
        <div className="rounded-full h-40 w-40 lg:h-56 lg:w-56 bg-blue-inter absolute -top-32 -left-10" />
        <div className="rounded-full h-40 w-40 lg:h-56 lg:w-56 bg-blue-inter absolute -bottom-32 -right-10" />
        <div className="container mx-auto p-4 lg:px-2">
          <div className="flex items-center justify-center lg:flex-row flex-col text-center gap-4 py-14">
            <h3 className="font-bold text-white text-2xl">
              Siap membuat kode pertamamu?
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

about.layout = MainLayout;

export default about;
