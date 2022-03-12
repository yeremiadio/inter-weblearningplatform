import { Button, Tag } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import Link from "next/link";
import VerticalDotMenuDropdown from "../Dropdown/VerticalDotMenuDropdown";
import { getTimeDiff } from "../../utils/getTimeDiff";
import { converTimeToMs } from "../../utils/convertTimeToMs";
import { useTimer } from "react-timer-hook";

const QuizzesCard = ({
  id,
  auth,
  title,
  thumbnail,
  type,
  startDate,
  endDate,
  results,
  questionLength = 0,
  slug,
  quizzes,
  mutate,
  isEditable = false,
}) => {
  const {
    days: daysDiff,
    hours: hoursDiff,
    minutes: minutesDiff,
  } = getTimeDiff(startDate, endDate);
  const time = new Date(startDate);
  time.setSeconds(
    time.getSeconds() + converTimeToMs(daysDiff, hoursDiff, minutesDiff)
  );
  const { days, hours, minutes } = useTimer({
    expiryTimestamp: time,
  });
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
        <div className="mb-2">
          {results.length !== 0 ? (
            <p className="text-md font-semibold">{`Score: ${results[0]?.score}`}</p>
          ) : (
            <p className="text-red-500">No Score</p>
          )}
        </div>
        <div
          className={
            "flex w-full items-center gap-2 " +
            (results ? "justify-between" : "justify-end")
          }
        >
          {new Date() < new Date(startDate) ? (
            <p className="text-secondary">Assignment has not started</p>
          ) : !isAllValuesObjectEmpty &&
            new Date(endDate) > new Date() &&
            results.length === 0 ? (
            <Link href={slug ? slug : ""}>
              <a className="w-full">
                <Button colorScheme={"blue"} isFullWidth>
                  Play
                </Button>
              </a>
            </Link>
          ) : results.length !== 0 ? (
            <Link
              href={{
                pathname: "assignments/result/[...params]",
                query: { params: [id, auth.user.id] },
              }}
            >
              <a className="w-full">
                <Button colorScheme={"blue"} variant="ghost" isFullWidth>
                  View Result
                </Button>
              </a>
            </Link>
          ) : (
            <p className="text-red-500 font-semibold">Not submitted</p>
          )}
          {isEditable && (
            <div>
              <VerticalDotMenuDropdown
                name={"quizzes"}
                selectedData={{ id: id, slug: slug.query.params[1] }}
                data={quizzes}
                mutate={mutate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizzesCard;
