import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

const CustomCard = ({ thumbnail, name, description, slug }) => {
  return (
    <div className="hover:shadow-lg transition-all delay-75 border border-gray-200 rounded-lg">
      <img
        src={thumbnail !== null ? thumbnail : "/imgPlaceholder.jpg"}
        alt=""
        className="w-full h-60 object-cover rounded-lg rounded-b-none"
      />
      <div className="p-4">
        <h3 className="text-primary text-xl lg:text-2xl font-bold line-clamp-2 mb-2">
          {name}
        </h3>
        <p className="text-secondary leading-loose text-base line-clamp-3 my-2">
          {description}
        </p>
        <Link href={`materi/${slug}`}>
          <a>
            <Button
              colorScheme={"blue"}
              size="md"
              colorScheme="blue"
              className="p-6"
              isFullWidth
            >
              Detail
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CustomCard;
