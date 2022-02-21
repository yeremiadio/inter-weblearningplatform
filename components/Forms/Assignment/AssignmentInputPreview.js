import { LinkBox, Tag, useDisclosure } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import React, { useRef } from "react";
import CustomModalChakra from "../../Modal/CustomModalChakra";
import RenderImageUpload from "../../Others/RenderImageUpload";
import moment from "moment";

const AssignmentInputPreview = () => {
  const { values: formValues } = useFormikContext();
  const buttonModalPreviewRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { thumbnail, title, questions, type, deadline } = formValues;
  return (
    <div className="sticky top-0">
      <p className="text-gray-500 text-sm mb-2">
        Click the card for full preview
      </p>
      <LinkBox
        as={"div"}
        ref={buttonModalPreviewRef}
        onClick={onOpen}
        className="bg-white shadow-default-weblearning rounded-md overflow-hidden cursor-pointer"
      >
        <CustomModalChakra
          ref={buttonModalPreviewRef}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          content={formValues}
        />
        <RenderImageUpload
          imageValue={thumbnail ? thumbnail : "/imgPlaceholder.jpg"}
        />
        <div className="p-4">
          <h3 className="font-bold text-2xl my-2">
            {title ? title : "Example Fundamental CSS"}
          </h3>
          <Tag
            className="my-2"
            size={"md"}
            colorScheme={type === "quiz" ? "blue" : "yellow"}
          >
            {type}
          </Tag>
          <p className="text-sm text-gray-500 my-2">
            Due Date:{" "}
            <span className="text-red-500">
              {moment(deadline).format("lll")}
            </span>
          </p>
          <p className="text-sm text-gray-500 my-2">
            Questions: <span className="font-bold">{questions.length}</span>
          </p>
        </div>
      </LinkBox>
    </div>
  );
};

export default AssignmentInputPreview;
