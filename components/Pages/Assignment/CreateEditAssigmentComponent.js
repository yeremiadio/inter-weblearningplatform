import { Box, Button } from "@chakra-ui/react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import instance from "../../../utils/instance";
import { jsonToFormData } from "../../../utils/jsonToFormData";
import BackButton from "../../Buttons/BackButton";
import AssignmentInputPreview from "../../Forms/Assignment/AssignmentInputPreview";
import AssignmentFormModel from "../../../components/Forms/Assignment/FormModel/AssignmentFormModel";
import MainAssignmentForm from "../../Forms/Assignment/MainAssignmentForm";
import AssignmentDetailForm from "../../Forms/Assignment/AssignmentDetailForm";
import { useToast } from "@chakra-ui/toast";
import moment from "moment";
const CreateEditAssigmentComponent = ({ data, isEditable }) => {
  const steps = ["Main Quiz", "Add Questions and Options"];
  const auth = useSelector((state) => state.auth.user);
  const router = useRouter();
  const { formId, formField } = AssignmentFormModel;
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const formikRef = useRef();
  const toast = useToast();
  const [errors, setErrors] = useState();
  const isLastStep = activeStep === steps.length - 1;
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
    title: data?.title || "",
    type: data?.type || quizTypes[0].name,
    start_date: data?.start_date || new Date(),
    end_date: data?.end_date || new Date(),
    questions: data?.questions || [
      {
        id: "",
        question: "",
        file: "",
        options: [{ id: "", title: "", correct: 0 }],
      },
    ],
    thumbnail: data?.thumbnail || "",
  };

  useEffect(() => {
    const ac = new AbortController();
    if (auth.user?.roles[0]?.name === "student") {
      router.replace("/dashboard");
      return toast({
        title: "Error",
        status: "error",
        description: "You don't have this permission",
        duration: 3000,
        isClosable: true,
      });
    } else {
      return () => {
        ac.abort();
      };
    }
  }, []);

  function _renderStepContent(step) {
    switch (step) {
      case 0:
        return (
          <MainAssignmentForm
            isEditable={isEditable}
            formField={formField}
            errors={errors}
          />
        );
      case 1:
        return <AssignmentDetailForm formField={formField} errors={errors} />;
      default:
        return;
    }
  }

  const _submitForm = useCallback((values, actions) => {
    setLoading(true);
    values.start_date = moment(values.start_date).format("YYYY-MM-DD HH:mm");
    values.end_date = moment(values.end_date).format("YYYY-MM-DD HH:mm");
    const formData = jsonToFormData(values);
    isEditable && formData.append("_method", "put");
    instance()
      .post(
        isEditable
          ? `api/quizzes/${router.query?.slug}/update`
          : "api/quizzes/create",
        formData
      )
      .then((res) => {
        toast({
          title: "Success",
          status: "success",
          description: isEditable
            ? "Assignment edited successfully"
            : "Assignment created successfully",
          isClosable: true,
          duration: 3000,
        });
        setLoading(false);
        router.back();
      })
      .catch((err) => {
        setErrors(err.response.data.data);
        setActiveStep(0);
        toast({
          title: "Error",
          status: "error",
          description: err.response.data.message,
          isClosable: true,
          duration: 3000,
        });
        setLoading(false);
      });
    actions.setSubmitting(false);
  }, []);

  const handleSubmit = async (values, actions) => {
    if (isLastStep) {
      await _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <>
      <BackButton />
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        innerRef={formikRef}
        enableReinitialize={isEditable && data && true}
        // validationSchema={currentValidationSchema}
      >
        {(props) => (
          <Form id={formId}>
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              <div className="bg-white w-full lg:w-4/5 h-4/5 shadow-default-weblearning p-4 rounded-md">
                Steps {`${activeStep + 1} of ${steps.length}`}
                {_renderStepContent(activeStep, props)}
                <Box className="flex justify-end gap-2">
                  <Button
                    size="md"
                    mt="4"
                    variant={"ghost"}
                    colorScheme="red"
                    onClick={() => {
                      props.resetForm();
                      setActiveStep(0);
                      setErrors();
                    }}
                  >
                    Reset
                  </Button>
                  {activeStep !== 0 && (
                    <Button
                      size="md"
                      mt="4"
                      variant={"outline"}
                      colorScheme={"blue"}
                      onClick={_handleBack}
                    >
                      Back
                    </Button>
                  )}

                  <Button
                    size="md"
                    leftIcon={
                      isLastStep ? (
                        <PaperAirplaneIcon className="w-4 h-4 rotate-90" />
                      ) : (
                        ""
                      )
                    }
                    mt="4"
                    colorScheme="blue"
                    type={"submit"}
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
                    {isLastStep ? "Submit" : "Next"}
                  </Button>
                </Box>
              </div>
              <div className="w-full lg:w-2/5 h-3/5">
                <AssignmentInputPreview />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateEditAssigmentComponent;
