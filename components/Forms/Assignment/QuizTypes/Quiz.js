import { Button, IconButton } from "@chakra-ui/react";
import {
  CheckIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { FieldArray, getIn } from "formik";
import React from "react";
import { useCallback } from "react";
import InputField from "../../../Inputs/FormikInputField";
import FormikUploadInput from "../../../Inputs/FormikUploadInput";
import RenderImageUpload from "../../../Others/RenderImageUpload";

const Quiz = ({ formValues, errors, setFieldValue, questions, options }) => {
  const initialOption = { id: "", title: "", correct: 0 };
  const initialQuestion = {
    id: "",
    question: "",
    file: "",
    options: [{ id: "", title: "", correct: 0 }],
  };
  const errorSingleQuestion = (index) =>
    getIn(errors, `questions[${index}].question`);

  const setAnswerQuestionForm = useCallback(
    (options, questionIndex, prevQuestionIndex) => {
      options.map((correct, index) =>
        setFieldValue(
          `questions[${questionIndex}].options[${index}].correct`,
          0
        )
      );
      setFieldValue(
        `questions[${questionIndex}].options[${prevQuestionIndex}].correct`,
        1
      );
    },
    [options]
  );
  return (
    <FieldArray name={questions.name}>
      {({ push, remove }) => (
        <>
          {formValues.questions.map((item, index) => (
            <div key={index} className="mt-4">
              <InputField name={`questions[${index}].id`} className="hidden" />
              <InputField
                name={`questions[${index}].question`}
                label={`Pertanyaan ${index + 1}`}
                className="mb-2"
              />
              <FormikUploadInput
                name={`questions[${index}].file`}
                label={"Image"}
              />
              <div className="flex justify-center items-center">
                <RenderImageUpload
                  className="mt-4 rounded-md overflow-hidden"
                  imageValue={item.file && item.file}
                />
              </div>
              {errorSingleQuestion(index) &&
                touched.questions[index].question && (
                  <p className="text-red-500">{errorSingleQuestion(index)}</p>
                )}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 items-center">
                <FieldArray name={questions.name[index].options}>
                  {({ push, remove }) => (
                    <>
                      {item.options.map((option, i) => (
                        <div key={i}>
                          <InputField
                            name={`questions[${index}].options[${i}].id`}
                            className="hidden"
                          />
                          <div className="flex gap-2 items-center">
                            <InputField
                              name={`questions[${index}].options[${i}].title`}
                              label={`Opsi ${i + 1}`}
                            />
                            <div className="flex gap-2 mt-8">
                              <IconButton
                                variant={
                                  formValues.questions[index].options[i].correct
                                    ? "solid"
                                    : "outline"
                                }
                                onClick={() =>
                                  setAnswerQuestionForm(item.options, index, i)
                                }
                                colorScheme="green"
                                rounded={"full"}
                                icon={<CheckIcon className="w-5 h-5" />}
                              />
                              <IconButton
                                variant={"outline"}
                                rounded="full"
                                icon={<TrashIcon className="w-5 h-5" />}
                                colorScheme="red"
                                onClick={() => remove(i)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div>
                        {item.options.length <= 3 && (
                          <Button
                            leftIcon={<PlusCircleIcon className="w-5 h-5" />}
                            colorScheme="green"
                            onClick={() => push(initialOption)}
                            className="mt-4 lg:mt-10"
                          >
                            New Option
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>
            </div>
          ))}
          {formValues.questions.length <= 9 && (
            <Button
              leftIcon={<PlusIcon className="w-5 h-5" />}
              onClick={() => push(initialQuestion)}
              colorScheme={"red"}
              className="mt-4"
            >
              New Question
            </Button>
          )}
        </>
      )}
    </FieldArray>
  );
};

export default Quiz;
