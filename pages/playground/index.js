import React from "react";
import Admin from "../../layouts/Admin.js";

export default function playground() {
  const items = [
    {
      id: 1,
      name: "Code Editor",
      desc: "Code Editor merupakan bla bla lorem ipsum",
      image: "/codemirror.png",
      href: "/playground/code",
    },
    {
      id: 2,
      name: "Webpage Builder",
      desc: "Webpage Builder merupakan bla bla lorem ipsum",
      image: "/webpage.jpg",
      href: "/playground/builder",
    },
  ];
  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => window.open(item.href, "_blank")}
              className="hover:shadow-lg cursor-pointer transition-all delay-75 bg-white border border-gray-200 rounded-lg"
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-60 object-cover rounded-lg rounded-b-none"
              />
              <div className="p-4">
                <h3 className="text-primary text-xl lg:text-2xl font-bold line-clamp-2 mb-2">
                  {item.name}
                </h3>
                <p className="text-secondary leading-loose text-base line-clamp-3 my-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

playground.layout = Admin;
