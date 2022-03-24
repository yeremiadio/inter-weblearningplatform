import { FieldArray } from "formik";
import React from "react";
import InputField from "../../../Inputs/FormikInputField";
import dynamic from "next/dynamic";
const FormikQuillTextInput = dynamic(
  import("../../../Inputs/FormikQuillTextInput"),
  {
    ssr: false,
  }
);
const EssayAssignment = ({ questions, errors }) => {
  return (
    <div>
      <FieldArray name={questions?.name}>
        <>
          <InputField name={"questions[0].id"} className="hidden" />
          <div className="mt-4">
            <FormikQuillTextInput
              name={`${questions?.name}.0.question`}
              label={questions?.label}
            />
            {errors && (
              <p className="text-red-500 text-sm">
                {errors[`questions.${0}.question`]}
              </p>
            )}
            {/* {JSON.stringify(formValues)} */}
          </div>
        </>
      </FieldArray>
    </div>
  );
};

export default EssayAssignment;
