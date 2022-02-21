import * as Yup from "yup";
// import moment from "moment";
import AssignmentFormModel from "../FormModel/AssignmentFormModel";
const {
  formField: { title, deadline, questions, options, type },
} = AssignmentFormModel;

export default [
  Yup.object().shape({
    [title.name]: Yup.string().required(`${title.requiredErrorMsg}`),
    [deadline.name]: Yup.date().required(`${deadline.requiredErrorMsg}`),
    [type.name]: Yup.string().required(`${type.requiredErrorMsg}`),
    [questions.name]: Yup.array(),
  }),
];
