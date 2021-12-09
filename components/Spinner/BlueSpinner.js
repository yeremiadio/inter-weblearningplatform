import { Spinner } from "@chakra-ui/react";
import React from "react";

const CustomSpinner = ({ ...rest }) => {
  return (
    <div className="my-4 flex justify-center items-center">
      <Spinner
        color="blue.500"
        thickness="3px"
        {...rest}
        emptyColor="gray.200"
        size="lg"
      />
    </div>
  );
};

export default CustomSpinner;
