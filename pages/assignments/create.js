import {
  Box,
  Button,
  FormLabel,
  Input,
  LinkBox,
  Select,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useFormik } from "formik";
import React, { useCallback, useRef } from "react";
import moment from "moment";
import BackButton from "../../components/Buttons/BackButton";
import DatePicker from "../../components/DatePicker";
import Admin from "../../layouts/Admin";
import CustomUploadButton from "../../components/Buttons/CustomUploadButton";
import RenderImageUpload from "../../components/Others/RenderImageUpload";
import CustomModalChakra from "../../components/Modal/CustomModalChakra";

function createAssignment() {
  const quizTypes = [
    {
      id: 1,
      name: "quiz",
    },
    {
      id: 2,
      name: "essay",
    },
  ];
  const initialValues = {
    title: "",
    type: quizTypes[0].name,
    deadline: new Date(),
    questions: [],
    thumbnail: "",
  };

  const buttonModalPreviewRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChangeImage = useCallback((e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    formik.setFieldValue(index, files[0]);
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <BackButton />
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <div className="bg-white w-full lg:w-4/5 h-4/5 shadow-default-weblearning p-4 rounded-md">
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <FormLabel>Judul</FormLabel>
              <Input
                isInvalid={formik.errors.title}
                focusBorderColor="blue.600"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder="Masukkan Judul..."
              />
              {formik.errors.title && (
                <p className="text-red-500">{formik.errors.title}</p>
              )}
            </div>
            <div className="mt-4">
              <FormLabel>Deadline</FormLabel>
              <DatePicker
                selectedDate={formik.values.deadline}
                onChange={(date) => formik.setFieldValue("deadline", date)}
              />
            </div>
            <div className="mt-4">
              <FormLabel>Thumbnail</FormLabel>
              <CustomUploadButton
                name={"thumbnail"}
                value={formik.values.thumbnail}
                onChange={(e) => onChangeImage(e, "thumbnail")}
              />
            </div>
            <div className="mt-4 w-44">
              <FormLabel>Assignment Type</FormLabel>
              <Select
                placeholder="Pilih tipe kuis"
                name="type"
                onChange={formik.handleChange}
                value={formik.values.type}
                size="md"
              >
                {quizTypes.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
            <Box className="flex justify-end gap-2">
              <Button
                size="md"
                leftIcon={<PaperAirplaneIcon className="w-4 h-4 rotate-90" />}
                mt="4"
                colorScheme="blue"
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </form>
        </div>
        <div className="w-full lg:w-2/5 h-3/5">
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
              content={formik.values}
            />
            <RenderImageUpload
              imageValue={
                formik.values.thumbnail
                  ? formik.values.thumbnail
                  : "/imgPlaceholder.jpg"
              }
            />
            <div className="p-4">
              <h3 className="font-bold text-2xl my-2">
                {formik.values.title ? formik.values.title : "title"}
              </h3>
              <Tag
                className="my-2"
                size={"md"}
                colorScheme={formik.values.type === "quiz" ? "blue" : "yellow"}
              >
                {formik.values.type}
              </Tag>
              <p className="text-sm text-gray-500 my-2">
                Due Date:{" "}
                <span className="text-red-500">
                  {moment(formik.values.deadline).format("lll")}
                </span>
              </p>
              <p className="text-sm text-gray-500 my-2">
                Questions:{" "}
                <span className="font-bold">
                  {formik.values.questions.length}
                </span>
              </p>
            </div>
          </LinkBox>
        </div>
      </div>
    </>
  );
}

createAssignment.layout = Admin;

export default createAssignment;
