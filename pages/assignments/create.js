import { Box, Button } from "@chakra-ui/react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import BackButton from "../../components/Buttons/BackButton";
import Admin from "../../layouts/Admin";
import MainQuizForm from "../../components/Forms/Assignment/MainQuizForm";
import QuizDetailForm from "../../components/Forms/Assignment/QuizDetailForm";
import AssignmentFormModel from "../../components/Forms/Assignment/FormModel/AssignmentFormModel";
import validationSchema from "../../components/Forms/Assignment/FormModel/validationSchema";
import AssignmentInputPreview from "../../components/Forms/Assignment/AssignmentInputPreview";

function createAssignment() {
  const steps = ["Main Quiz", "Add Questions and Options"];
  const { formId, formField } = AssignmentFormModel;
  const [activeStep, setActiveStep] = useState(0);
  const formikRef = useRef();
  const currentValidationSchema = validationSchema[activeStep];
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
    deadline: new Date(),
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

  function _renderStepContent(step) {
    switch (step) {
      case 0:
        return <MainQuizForm formField={formField} />;
      case 1:
        return <QuizDetailForm formField={formField} />;
      default:
        return;
    }
  }

  async function _submitForm(values, actions) {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }

  const handleSubmit = async (values, actions) => {
    if (isLastStep) {
      _submitForm(values, actions);
      console.log(values);
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
        validationSchema={currentValidationSchema}
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

createAssignment.layout = Admin;

export default createAssignment;
