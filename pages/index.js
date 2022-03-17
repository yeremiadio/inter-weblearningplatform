import { Button } from "@chakra-ui/react";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-700 to-blue-900">
        <div className="bg-white w-full h-2/4 lg:w-2/6 lg:rounded-lg">
          <div className="flex flex-col justify-center items-center h-full">
            <img
              src="interWithText.svg"
              className="object-cover w-48 mb-8"
              alt=""
            />
            <div className="flex flex-col md:flex-row gap-2">
              <Button colorScheme={"blue"} size={"lg"}>
                <Link href={"login"}>
                  <a>Get Started</a>
                </Link>
              </Button>
              <Button size={"lg"}>
                <Link href={"register"}>
                  <a>Register</a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <ul className="flex gap-4">
            <li>
              <Link href={"developer"}>
                <a className="text-white text-opacity-50 text-sm hover:text-opacity-100 transition-all delay-75">
                  Pengembang
                </a>
              </Link>
            </li>
            {/* <li>
              <Link href={"register"}>
                <a className="text-white text-opacity-50 text-sm hover:text-opacity-100 transition-all delay-75">
                  Penggunaan
                </a>
              </Link>
            </li>
            <li>
              <Link href={"register"}>
                <a className="text-white text-opacity-50 text-sm hover:text-opacity-100 transition-all delay-75">
                  Tentang Aplikasi
                </a>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
