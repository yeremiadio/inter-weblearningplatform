import { LinkBox, Tag, useDisclosure } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import React, { useRef } from "react";
import CustomModalChakra from "../../Modal/CustomModalChakra";
import RenderImageUpload from "../../Others/RenderImageUpload";
import moment from "moment";
import { getTimeDiff } from "../../../utils/getTimeDiff";

const AssignmentInputPreview = () => {
  const { values: formValues } = useFormikContext();
  const buttonModalPreviewRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { thumbnail, title, questions, type, start_date, end_date } =
    formValues;
  const { days, hours, minutes } = getTimeDiff(start_date, end_date);
  return (
    <div className="sticky top-0">
      <div className="bg-white shadow-default-weblearning rounded-md overflow-hidden">
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
            Start Date:{" "}
            <span className="text-red-500">
              {moment(start_date).format("lll")}
            </span>
          </p>
          <p className="text-sm text-gray-500 my-2">
            End Date:{" "}
            <span className="text-red-500">
              {moment(end_date).format("lll")}
            </span>
          </p>
          <p className="text-sm text-gray-500 my-2">
            Duration:{" "}
            <b>{`${days} days, ${hours} hours, ${minutes} minutes`}</b>
          </p>
          {type === "quiz" && (
            <p className="text-sm text-gray-500 my-2">
              Questions: <span className="font-bold">{questions.length}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentInputPreview;
