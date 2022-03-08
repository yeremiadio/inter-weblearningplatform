import { Box, Button } from "@chakra-ui/react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BackButton from "../../components/Buttons/BackButton";
import Admin from "../../layouts/Admin";
import MainQuizForm from "../../components/Forms/Assignment/MainQuizForm";
import QuizDetailForm from "../../components/Forms/Assignment/QuizDetailForm";
import AssignmentFormModel from "../../components/Forms/Assignment/FormModel/AssignmentFormModel";
import validationSchema from "../../components/Forms/Assignment/FormModel/validationSchema";
import AssignmentInputPreview from "../../components/Forms/Assignment/AssignmentInputPreview";
import { jsonToFormData } from "../../utils/jsonToFormData";
import instance from "../../utils/instance";
import moment from "moment";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
function create() {
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
    title: "",
    type: quizTypes[0].name,
    start_date: new Date(),
    end_date: new Date(),
    questions: [
      {
        id: "",
        question: "",
        file: "",
        options: [{ id: "", title: "", correct: 0 }],
      },
    ],
    thumbnail: "",
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
        return <MainQuizForm formField={formField} errors={errors} />;
      case 1:
        return <QuizDetailForm formField={formField} errors={errors} />;
      default:
        return;
    }
  }

  const _submitForm = useCallback((values, actions) => {
    setLoading(true);
    values.start_date = moment(values.start_date).format("YYYY-MM-DD HH:mm");
    values.end_date = moment(values.end_date).format("YYYY-MM-DD HH:mm");
    const formData = jsonToFormData(values);
    instance()
      .post("api/quizzes/create", formData)
      .then((res) => {
        console.log(res);
        toast({
          title: "Success",
          status: "success",
          description: "Quiz created successfully",
          isClosable: true,
          duration: 3000,
        });
        setLoading(false);
        router.back();
      })
      .catch((err) => {
        // console.log(err.response.data.data);
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
}

create.layout = Admin;

export default create;
