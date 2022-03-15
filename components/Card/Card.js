import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import VerticalDotMenuDropdown from "../Dropdown/VerticalDotMenuDropdown";

const CustomCard = ({
  id = 0,
  data = [],
  thumbnail = "",
  mutate,
  title = "",
  href = "",
  description = "",
  slug = "",
  isEditable = false,
}) => {
  return (
    <div className="hover:shadow-default-weblearning transition-all delay-75 border border-gray-200 rounded-lg bg-white">
      <div className="relative">
        <img
          src={thumbnail ? thumbnail : "/imgPlaceholder.jpg"}
          alt=""
          className="w-full h-60 object-cover rounded-lg rounded-b-none"
        />
        {isEditable && (
          <div className="absolute top-4 right-2">
            <VerticalDotMenuDropdown
              name={"materials"}
              namePage="materials"
              selectedData={{ id: id, slug: slug }}
              data={data}
              mutate={mutate}
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-primary text-xl lg:text-2xl font-bold line-clamp-2 mb-2">
          {title}
        </h3>
        <p className="text-secondary leading-loose text-base line-clamp-3 my-2">
          {description}
        </p>
        <div
          className={
            "flex w-full items-center gap-2 " +
            (isEditable ? "justify-between" : "justify-end")
          }
        >
          <Link href={href ? href : "/"}>
            <a className="w-full">
              <Button colorScheme={"blue"} isFullWidth>
                View Detail
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
