import { Button, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import MainLayout from "../layouts/MainLayout";

const developer = () => {
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      <section className="container mx-auto p-4 lg:px-2 mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 place-content-center place-items-center">
          <div className="order-last lg:order-first lg:pr-16">
            <h3 className="font-bold text-darkblue-inter text-4xl mb-4">
              Hi, I'm Yeremia Alfa Dio
            </h3>
            <span className="text-base text-darkblue-inter text-opacity-50 leading-relaxed">
              Undergraduate Student from State University of Surabaya. Currently
              working as a <b>Frontend Developer</b> with one and a half year of
              experience in designing, and developing scalable web or mobile
              applications. Proficient in developing products for web and mobile
              design, excels in creating user interface design with a solid
              background to contribute from conception to completion.
            </span>
            <br />
            <Link href={"https://www.linkedin.com/in/yeremiadio"}>
              <a target={"_blank"}>
                <Button
                  className="my-6"
                  isFullWidth={!isLargerThan1024}
                  colorScheme={"blue"}
                  size={"md"}
                  rightIcon={<ArrowNarrowRightIcon className="w-5 h-5" />}
                >
                  Connect Now
                </Button>
              </a>
            </Link>
          </div>
          <div className="w-full">
            <img className="w-full h-1/6" src={"/frame-hero-dio.png"} />
          </div>
        </div>
      </section>
    </>
  );
};

developer.layout = MainLayout;

export default developer;
