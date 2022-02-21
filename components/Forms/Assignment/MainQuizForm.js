import React from "react";
import FormikDatePickerInput from "../../Inputs/FormikDatePickerInput";
import FormikInputField from "../../Inputs/FormikInputField";
import FormikSelectInput from "../../Inputs/FormikSelectInput";

const MainQuizForm = ({ formField }) => {
  const { title, deadline, type } = formField;
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
        <FormikDatePickerInput name={deadline.name} label={deadline.label} />
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
