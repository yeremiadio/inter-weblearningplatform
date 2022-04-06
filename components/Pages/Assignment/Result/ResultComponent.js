import { Button, FormLabel, Input, Tag } from "@chakra-ui/react";
import React from "react";
import parse from "html-react-parser";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import instance from "../../../../utils/instance";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useToast } from "@chakra-ui/toast";
import { useSelector } from "react-redux";
const ReactPdfViewerComponent = dynamic(
  import("../../../ReactPdfViewerComponent"),
  {
    ssr: false,
  }
);

const ResultComponent = ({ result }) => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      score: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      instance()
        .put(`api/result/${result.id}/essay`, values)
        .then((res) => {
          router.replace("/assignments");
          toast({
            title: "Success",
            status: "success",
            description: "Score submitted successfully",
            isClosable: true,
            duration: 3000,
          });
          setIsLoading(false);
        })
        .catch((err) => {
          toast({
            title: "Error",
            status: "error",
            description: "Error submitting the score",
            isClosable: true,
            duration: 3000,
          });
          setIsLoading(false);
        });
    },
  });
  return (
    <>
      <div className="mb-4">
        <h3 className="text-3xl my-4 font-extrabold text-primary">
          {result.quiz?.title}
        </h3>
        <Tag
          size={"md"}
          colorScheme={result.quiz?.type === "quiz" ? "blue" : "yellow"}
        >
          {result.quiz?.type}
        </Tag>
      </div>
      <span className="text-lg text-secondary font-semibold">
        Score: {result?.score}
      </span>

      <div className="mt-4">
        <span className="my-4 text-lg lg:text-xl font-bold text-primary">
          Submitted Answers
        </span>
        <div className="mt-4 text-secondary">
          {result.quiz?.type === "quiz"
            ? result.result_quizzes?.map((item, index) => (
                <div key={item.id} className="my-2">
                  <h3 className="text-primary font-semibold">{`${index + 1}. ${
                    item.question.question
                  }`}</h3>
                  <p className="text-primary">
                    Your answer: {item.option.title}
                  </p>
                  {item.correct === 1 || item.correct === true ? (
                    <span className="text-green-600 font-semibold">
                      Answer is correct
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Answer is incorrect
                    </span>
                  )}
                </div>
              ))
            : result.result_essays?.map((item, index) => (
                <div key={item.id} className="my-2">
                  <div className="mb-4">
                    <h3 className="text-primary font-semibold">{`Pertanyaan`}</h3>
                    {parse(item.question?.question)}
                  </div>
                  <div className="mb-4">
                    {" "}
                    <h3 className="text-primary font-semibold">{`Dokumen PDF`}</h3>
                    <ReactPdfViewerComponent url={item.file} />
                  </div>
                  <div className="mb-4">
                    <h3 className="text-primary font-semibold">{`Komentar`}</h3>
                    <p className="text-secondary">{item.comment}</p>
                  </div>
                </div>
              ))}
        </div>
        {result.quiz?.type === "essay" &&
          auth.user?.user?.roles[0]?.name !== "student" && (
            <div className="mb-4">
              <form onSubmit={formik.handleSubmit}>
                <div className="mt-2 w-3/4 lg:w-1/4">
                  <FormLabel className="font-semibold">
                    Masukkan Score
                  </FormLabel>
                  <Input
                    name="score"
                    value={formik.values.score}
                    onChange={formik.handleChange}
                  />
                </div>
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme={"blue"}
                  className="my-4"
                  isLoading={isLoading}
                  leftIcon={<PaperAirplaneIcon className="w-5 h-5 rotate-90" />}
                >
                  Submit Score
                </Button>
              </form>
            </div>
          )}
      </div>
    </>
  );
};

export default ResultComponent;
