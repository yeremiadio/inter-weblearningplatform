import { useFormikContext } from "formik";
import React from "react";
import EssayAssignment from "./QuizTypes/Essay";
import Quiz from "./QuizTypes/Quiz";
const QuizDetailForm = ({ formField, errors }) => {
  const { questions, options } = formField;
  const { values: formValues, setFieldValue } = useFormikContext();
  return (
    <>
      {formValues.type === "quiz" ? (
        <Quiz
          formValues={formValues}
          setFieldValue={setFieldValue}
          questions={questions}
          errors={errors}
          options={options}
        />
      ) : (
        <EssayAssignment
          formValues={formValues}
          setFieldValue={setFieldValue}
          errors={errors}
        />
      )}
    </>
  );
};

export default QuizDetailForm;
