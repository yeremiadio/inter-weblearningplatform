import React, { useCallback } from "react";
import parse from "html-react-parser";
import { useFormik } from "formik";
import { jsonToFormData } from "../../../utils/jsonToFormData";
import CustomUploadButton from "../../Buttons/CustomUploadButton";
import { FolderAddIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { Button, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import instance from "../../../utils/instance";
const DetailEssayComponent = ({ data, mutate, error }) => {
  const formik = useFormik({
    initialValues: {
      file: data.file || "",
      comment: data.comment || "",
    },
    onSubmit: (values) => {
      const formData = jsonToFormData(values);
      formData.append("question_id", data.id);
      instance()
        .post(`api/result/${data.slug}/essay`, formData)
        .then((res) => alert("success"))
        .catch((err) => alert("error"));
    },
  });
  const onChange = useCallback((e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    // formik.
    formik.setFieldValue("file", files[0]);
  });
  return (
    <>
      <img
        src={data.thumbnail ? data.thumbnail : "/imgPlaceholder.jpg"}
        alt=""
        className="w-full lg:h-96 object-cover rounded-lg mb-4"
      />
      <div className="bg-section">
        <h3 className="text-3xl my-4 font-extrabold text-primary">
          {data.title}
        </h3>
        <div>
          <span className="my-4 text-lg lg:text-xl font-bold text-primary">
            Quest:
          </span>
          <div className="mb-4 text-secondary">
            {parse(data.questions[0].question)}
          </div>
          <div>
            <span className="my-4 text-lg lg:text-xl font-bold text-primary">
              Your Answer:
            </span>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-2">
                <FormLabel>Upload Document</FormLabel>
                <CustomUploadButton
                  name="file"
                  accept={"*"}
                  value={formik.values.file}
                  onChange={onChange}
                  icon={<FolderAddIcon className="w-5 h-5" />}
                />
              </div>
              <div className="mt-4">
                <FormControl>
                  <FormLabel>Comment</FormLabel>
                  <Textarea
                    focusBorderColor="blue.600"
                    name="comment"
                    minH={150}
                    onChange={formik.handleChange}
                    value={formik.values.comment}
                    placeholder="Masukkan komentar anda..."
                  />
                </FormControl>
              </div>
              <Button
                type="submit"
                variant="solid"
                colorScheme={"blue"}
                className="my-4"
                leftIcon={<PaperAirplaneIcon className="w-5 h-5 rotate-90" />}
              >
                Submit Essay
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailEssayComponent;
