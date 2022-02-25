import { FieldArray } from "formik";
import React from "react";
import InputField from "../../../Inputs/FormikInputField";
import { FormLabel } from "@chakra-ui/react";
import FormikDraftJsInput from "../../../Inputs/FormikDraftJsInput";

const EssayAssignment = ({ formValues, setFieldValue }) => {
  return (
    <div>
      <FieldArray name="questions">
        <>
          <InputField name={"questions[0].id"} className="hidden" />
          <div className="mt-4">
            <FormikDraftJsInput
              name="questions[0].question"
              setFieldValue={setFieldValue}
              label={"Pertanyaan"}
            />
          </div>
        </>
      </FieldArray>
    </div>
  );
};

export default EssayAssignment;
