import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@heroicons/react/solid";
import React from "react";

const CustomSearchInput = ({ setFilterText, ...rest }) => {
  return (
    <InputGroup className="bg-white">
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon className="text-gray-300 w-6 h-6" />}
      />
      <Input {...rest} onChange={(e) => setFilterText(e.target.value)} />
    </InputGroup>
  );
};

export default CustomSearchInput;
