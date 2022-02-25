import { useFormikContext } from "formik";
import React from "react";
import EssayAssignment from "./QuizTypes/Essay";
import Quiz from "./QuizTypes/Quiz";
const QuizDetailForm = ({ formField }) => {
  const { questions, options } = formField;
  const { values: formValues, errors, setFieldValue } = useFormikContext();
  return (
    <>
      {formValues.type === "quiz" ? (
        <Quiz
          formValues={formValues}
          errors={errors}
          setFieldValue={setFieldValue}
          questions={questions}
          options={options}
        />
      ) : (
        <EssayAssignment
          formValues={formValues}
          setFieldValue={setFieldValue}
        />
      )}
    </>
  );
};

export default QuizDetailForm;
