import { FieldArray } from "formik";
import React from "react";
import InputField from "../../../Inputs/FormikInputField";
import FormikTextAreaInput from "../../../Inputs/FormikTextAreaInput";
const EssayAssignment = ({ formValues, setFieldValue, questions, errors }) => {
  return (
    <div>
      <FieldArray name={questions.name}>
        <>
          <InputField name={"questions[0].id"} className="hidden" />
          <div className="mt-4">
            <FormikTextAreaInput
              name={`${questions.name}.0.question`}
              label={questions.label}
            />
            {errors && (
              <p className="text-red-500 text-sm">
                {errors[`questions.${0}.question`]}
              </p>
            )}
          </div>
        </>
      </FieldArray>
    </div>
  );
};

export default EssayAssignment;
