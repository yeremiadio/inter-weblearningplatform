import { FormLabel } from "@chakra-ui/react";
import { useField } from "formik";
// import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "../DatePicker";

const FormikDatePickerInput = (props) => {
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
    }
  }, [value]);

  function onChange(date) {
    if (date) {
      setValue(date);
    }
  }
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <DatePicker
        selectedDate={selectedDate}
        {...field}
        {...rest}
        onChange={(date) => onChange(date)}
      />
      {isError && error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </>
  );
};

export default FormikDatePickerInput;
