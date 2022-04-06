import { Button, IconButton } from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTimer } from "react-timer-hook";
import { getTimeDiff } from "../../../utils/getTimeDiff";
import instance from "../../../utils/instance";
import SubmitAssignmentModal from "../../Modal/Components/Assignment/SubmitAssignmentModal";
import { Modal } from "../../Modal/Modal";

function DetailQuizComponent({ data, mutate, error, toast }) {
  const auth = useSelector((state) => state.auth.user);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(data ? data.questions : "");
  const { hours, minutes: minuteTimes } = getTimeDiff(
    data?.start_date,
    data?.end_date
  );
  const { thumbnail, question, options } = quiz[currentIndex];
  const router = useRouter();
  const SubmitAssignmentRef = useRef();
  const { params } = router.query;
  const [score, setScore] = useState({
    correct: 0,
    false: 0,
  });
  useEffect(() => {
    const questionAnswered = quiz.filter((item) => item.selected);
    const questionCorrect = questionAnswered.filter((item) =>
      item.options.find(
        (option) => option.correct && option.selected === option.correct
      )
    );
    setScore({
      correct: questionCorrect.length,
      false: quiz.length - questionCorrect.length,
    });
  }, [quiz]);

  const selectOption = (indexSelected, indexOptionSelected) => {
    setQuiz(
      quiz.map((item, index) =>
        index === indexSelected
          ? {
              ...item,
              selected: 1,
              options: options.map((item, index) =>
                index === indexOptionSelected
                  ? { ...item, selected: 1 }
                  : { ...item, selected: 0 }
              ),
            }
          : item
      )
    );
  };

  function hoursToMs(hours) {
    var ms = parseInt(hours * 3600); // 3,600 seconds in 1 hour
    return ms;
  }

  const MINUTES = hoursToMs(hours);
  const time = new Date(data?.start_date);
  time.setSeconds(time.getSeconds() + MINUTES);

  const { seconds, minutes } = useTimer({
    expiryTimestamp: time,
    onExpire: () => router.replace("/assignments"),
  });

  const postResultQuiz = async (quiz) => {
    const data = JSON.stringify(quiz);
    setLoading(true);
    instance()
      .post(`api/result/${params && params[1]}/quiz`, { data: data })
      .then((res) => {
        setLoading(false);
        router.replace("/assignments");
        toast({
          title: "Success",
          status: "success",
          description: "Result submitted successfully",
          isClosable: true,
          duration: 3000,
        });
      })
      .catch((errors) => {
        setLoading(false);
        toast({
          title: "Error",
          status: "error",
          description: "Error submitting the quiz",
          isClosable: true,
          duration: 3000,
        });
      });
  };

  return (
    <>
      <Modal ref={SubmitAssignmentRef}>
        <SubmitAssignmentModal
          parent={SubmitAssignmentRef}
          isLoading={isLoading}
          handleData={() => postResultQuiz(quiz)}
        />
      </Modal>
      <div className="bg-section">
        <div className="my-4">
          {auth.user?.roles[0]?.name === "student" && (
            <>
              Time Left:{" "}
              <b>
                {minutes}:{seconds}
              </b>
            </>
          )}
        </div>
        <div className="flex lg:flex-row items-center justify-center flex-1 flex-wrap gap-2 mb-2">
          {quiz.map((item, index) => (
            <Button
              colorScheme={"blue"}
              key={index}
              size={"md"}
              rounded="full"
              onClick={() => setCurrentIndex(index)}
              variant={index === currentIndex ? "solid" : "outline"}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <div className="flex my-2 flex-col justify-center items-center">
          {thumbnail && (
            <div className="w-full lg:w-96 my-4">
              <img src={thumbnail} alt="" className="object-cover rounded-md" />
            </div>
          )}
          <h3
            className={
              "my-4 text-center font-semibold text-primary " +
              (thumbnail ? "text-lg lg:text-xl" : "text-xl lg:text-2xl")
            }
          >
            {question}
          </h3>
        </div>
        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 my-4 place-content-center auto-rows-max gap-4">
          {options
            .filter((item) => {
              if (auth.user?.roles[0]?.name !== "student") {
                return item.correct === 1;
              } else {
                return item;
              }
            })
            .map((item, index) => (
              <div
                key={item.id}
                className={
                  (auth.user?.roles[0]?.name === "student" &&
                    "cursor-pointer") +
                  " text-white rounded-full transition-all delay-75 flex flex-col items-center justify-center lg:h-16 p-2 text-center " +
                  (item?.selected
                    ? "bg-green-600"
                    : "border-2 border-green-600 text-green-600")
                }
                onClick={() =>
                  auth.user?.roles[0]?.name === "student" &&
                  selectOption(currentIndex, index)
                }
              >
                <span className="text-base">{item.title}</span>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-center gap-2">
          {currentIndex !== 0 && quiz.length - 1 !== currentIndex && (
            <IconButton
              rounded={"full"}
              variant="ghost"
              colorScheme={"blue"}
              icon={<ChevronLeftIcon className="w-5 h-5" />}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            />
          )}
          <div></div>
          {quiz.length - 1 !== currentIndex && (
            <IconButton
              rounded={"full"}
              colorScheme={"blue"}
              variant="ghost"
              icon={<ChevronRightIcon className="w-5 h-5" />}
              onClick={() => setCurrentIndex((prev) => prev + 1)}
            />
          )}
          {quiz.length - 1 === currentIndex &&
            auth.user?.roles[0]?.name === "student" && (
              <Button
                colorScheme={"blue"}
                onClick={() => SubmitAssignmentRef.current.open()}
                leftIcon={<PaperAirplaneIcon className="w-5 h-5 rotate-90" />}
              >
                Submit
              </Button>
            )}
        </div>
      </div>
    </>
  );
}

export default DetailQuizComponent;
