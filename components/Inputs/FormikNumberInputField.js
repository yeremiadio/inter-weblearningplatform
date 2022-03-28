import React, { useEffect, useState } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useField } from "formik";

const FormikNumberInputField = (props) => {
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;
  const [numberInput, setNumberInput] = useState(0);

  useEffect(() => {
    if (value) {
      setNumberInput(value);
    }
  }, [value]);

  function onChange(val) {
    if (val) {
      setValue(val);
    }
  }
  return (
    <>
      <NumberInput
        {...field}
        {...rest}
        value={numberInput}
        onChange={(valueString) => onChange(+valueString)}
        isInvalid={isError}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
};

export default FormikNumberInputField;
