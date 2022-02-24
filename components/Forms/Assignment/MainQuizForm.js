import { FormLabel } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import React from "react";
import { useTimer } from "react-timer-hook";
import FormikDatePickerInput from "../../Inputs/FormikDatePickerInput";
import FormikInputField from "../../Inputs/FormikInputField";
import FormikNumberInputField from "../../Inputs/FormikNumberInputField";
import FormikSelectInput from "../../Inputs/FormikSelectInput";
import FormikUploadInput from "../../Inputs/FormikUploadInput";

const MainQuizForm = ({ formField }) => {
  const { title, start_date, end_date, type, thumbnail } = formField;
  const quizTypes = [
    {
      value: "quiz",
      label: "Quiz",
    },
    {
      value: "essay",
      label: "Essay",
    },
  ];
  return (
    <>
      <div className="mt-4">
        <FormikInputField name={title.name} label={title.label} />
      </div>
      <div className="mt-4">
        <FormikDatePickerInput
          name={start_date.name}
          label={start_date.label}
        />
      </div>
      <div className="mt-4">
        <FormikDatePickerInput name={end_date.name} label={end_date.label} />
      </div>
      <div className="mt-4">
        <FormikUploadInput name={thumbnail.name} label={thumbnail.label} />
      </div>
      <div className="mt-4 w-1/2 lg:w-32">
        <FormikSelectInput
          name={type.name}
          label={type.label}
          data={quizTypes}
        />
      </div>
    </>
  );
};

export default MainQuizForm;

