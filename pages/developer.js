import React from "react";

const developer = () => {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 justify-center items-center mt-12 lg:mt-20">
          <div className="lg:mx-6 order-last lg:order-first">
            <h3 className="font-bold lg:font-extrabold text-blue-800 text-4xl lg:text-5xl mb-4">
              Hi, I'm Yeremia Alfa Dio
            </h3>
            <span className="text-base md:text-lg font-light text-gray-500 leading-relaxed">
              Undergraduate Student from State University of Surabaya. Currently
              working as a <b className="text-blue-800">Frontend Developer</b>{" "}
              with one and a half year of experience in designing, and
              developing scalable web or mobile applications. Proficient in
              developing products for web and mobile design, excels in creating
              user interface design with a solid background to contribute from
              conception to completion.
            </span>
          </div>
          <div className="grid place-items-center my-4 lg:my-0">
            <img
              src="../frame-hero-dio.png"
              alt=""
              className="w-11/12 lg:w-3/4 h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default developer;
