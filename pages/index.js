import { Button } from "@chakra-ui/react";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="bg-blue-700 grid place-items-center h-screen">
        <div className="bg-white h-2/4 w-full lg:w-2/5 p-6 border border-gray-200 rounded-lg flex flex-col lg:justify-start justify-center items-center">
          <img
            src="interWithText.svg"
            className="object-cover w-48 lg:mt-20 mb-8"
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
    </>
  );
}
