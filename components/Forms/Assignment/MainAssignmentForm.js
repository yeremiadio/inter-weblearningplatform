import React from "react";
import FormikDatePickerInput from "../../Inputs/FormikDatePickerInput";
import FormikInputField from "../../Inputs/FormikInputField";
import FormikSelectInput from "../../Inputs/FormikSelectInput";
import FormikUploadInput from "../../Inputs/FormikUploadInput";

const MainAssignmentForm = ({ formField, isEditable, errors }) => {
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
        <FormikInputField
          name={title.name}
          label={title.label}
          isInvalid={errors?.title && true}
        />
        {errors?.title && (
          <p className="text-red-500 text-sm">{errors?.title}</p>
        )}
      </div>
      <div className="mt-4">
        <FormikDatePickerInput
          name={start_date.name}
          label={start_date.label}
        />
        {errors?.start_date && (
          <p className="text-red-500 text-sm">{errors?.start_date}</p>
        )}
      </div>
      <div className="mt-4">
        <FormikDatePickerInput name={end_date.name} label={end_date.label} />
        {errors?.end_date && (
          <p className="text-red-500 text-sm">{errors?.end_date}</p>
        )}
      </div>
      <div className="mt-4">
        <FormikUploadInput name={thumbnail.name} label={thumbnail.label} />
        {errors?.thumbnail && (
          <p className="text-red-500 text-sm">{errors?.thumbnail}</p>
        )}
      </div>
      {!isEditable && (
        <div className="mt-4 w-1/2 lg:w-32">
          <FormikSelectInput
            name={type.name}
            label={type.label}
            data={quizTypes}
          />
        </div>
      )}
    </>
  );
};

export default MainAssignmentForm;
