import { useFormikContext } from "formik";
import React from "react";
import EssayAssignment from "./QuizTypes/Essay";
import Quiz from "./QuizTypes/Quiz";
const AssignmentDetailForm = ({ formField, errors }) => {
  const { questions, options, essayQuestion } = formField;
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
          questions={questions}
          essayQuestion={essayQuestion}
          formValues={formValues}
          setFieldValue={setFieldValue}
          errors={errors}
        />
      )}
    </>
  );
};

export default AssignmentDetailForm;
