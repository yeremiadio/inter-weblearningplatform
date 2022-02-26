import { Button, Tag } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import Link from "next/link";
import ChakraMenuDropdown from "../Dropdown/ChakraMenuDropdown";
import { getTimeDiff } from "../../utils/getTimeDiff";

const QuizzesCard = ({
  id,
  title,
  thumbnail,
  type,
  startDate,
  endDate,
  questionLength = 0,
  slug,
  quizzes,
  mutate,
  isEditable = false,
}) => {
  const { days, hours, minutes } = getTimeDiff(startDate, endDate);
  const isAllValuesObjectEmpty = Object.values({ days, hours, minutes }).every(
    (value) => {
      if (value === 0 || value === null) {
        return true;
      }

      return false;
    }
  );
  return (
    <div className="hover:shadow-default-weblearning transition-all delay-75 border border-gray-200 rounded-lg bg-white">
      <img
        src={thumbnail ? thumbnail : "/imgPlaceholder.jpg"}
        alt=""
        className="w-full h-60 object-cover rounded-lg rounded-b-none"
      />
      <div className="p-4">
        <h3 className="text-primary text-xl lg:text-2xl font-bold line-clamp-2 mb-2">
          {title}
        </h3>
        <Tag
          className="my-2"
          size={"md"}
          colorScheme={type === "quiz" ? "blue" : "yellow"}
        >
          {type}
        </Tag>
        <span className="text-secondary leading-loose text-base line-clamp-3">
          Start Date: {moment(startDate).format("lll")}
        </span>
        <span className="text-secondary leading-loose text-base line-clamp-3">
          End Date: {moment(endDate).format("lll")}
        </span>
        <span className="text-secondary leading-loose text-base line-clamp-3">
          Duration: <b>{`${days} days, ${hours} hours, ${minutes} minutes`}</b>
        </span>
        <span className="text-secondary leading-loose text-base line-clamp-3 mb-2">
          Questions: <b>{questionLength}</b>
        </span>
        <div className="flex w-full items-center justify-end gap-2">
          {!isAllValuesObjectEmpty && new Date(endDate) > new Date() && (
            <Link href={slug ? slug : ""}>
              <a className="w-full">
                <Button colorScheme={"blue"} colorScheme="blue" isFullWidth>
                  Play
                </Button>
              </a>
            </Link>
          )}
          {isEditable && (
            <ChakraMenuDropdown
              selectedData={{ id: id, slug: slug.query.params[1] }}
              quizzes={quizzes}
              mutate={mutate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizzesCard;
