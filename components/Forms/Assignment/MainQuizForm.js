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
  const { title, start_date, end_date, type, duration, thumbnail } = formField;
  const { values: formValues } = useFormikContext();
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
      <div className="mt-4 w-3/5 lg:w-1/5">
        <FormLabel>{duration.label + " (minute)"}</FormLabel>
        <div className="grid grid-cols-2 space-x-2 items-center">
          <FormikNumberInputField
            name={duration.name}
            defaultValue={15}
            min={1}
          />
        </div>
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

{
  /* <FormLabel>Title</FormLabel>
        <Field
          as={Input}
          isInvalid={errors.title && touched.title}
          focusBorderColor="blue.600"
          name="title"
          placeholder="Masukkan Judul..."
        />
        {errors.title && touched.title && (
          <p className="text-red-500">{errors.title}</p>
        )} */
}

{
  /* <div className="mt-4">
        <FormLabel>Deadline</FormLabel>
        <Field
          as={DatePicker}
          selectedDate={values.deadline}
          onChange={(date) => setFieldValue("deadline", date)}
        />
      </div>
      <div className="mt-4">
        <FormLabel>Thumbnail</FormLabel>
        <Field
          as={CustomUploadButton}
          name={"thumbnail"}
          onChange={(e) => onChangeImage(e, "thumbnail")}
        />
      </div>
      <div className="mt-4 w-44">
        <FormLabel>Assignment Type</FormLabel>
        <Field as={Select} placeholder="Pilih tipe kuis" name="type" size="md">
          {quizTypes.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </Field>
      </div> */
}
