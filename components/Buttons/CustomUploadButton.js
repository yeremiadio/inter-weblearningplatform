import { Button } from "@chakra-ui/react";
import { CameraIcon } from "@heroicons/react/solid";
import React, { useRef } from "react";

const CustomUploadButton = ({
  name,
  accept,
  icon,
  onChange,
  value,
  variant = "outline",
}) => {
  const inputRef = useRef();
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={variant}
        leftIcon={<CameraIcon className="w-5 h-5" /> ?? icon}
        onClick={() => inputRef.current.click()}
      >
        Upload
        <input
          ref={inputRef}
          type="file"
          name={name ?? "image"}
          hidden
          accept={accept ?? "image/*"}
          onChange={onChange}
        />
      </Button>
      {typeof value === "object" && value !== null && (
        <p className="truncate w-24 lg:w-32">{value.name}</p>
      )}
    </div>
  );
};

export default CustomUploadButton;
