import * as Yup from "yup";
// import moment from "moment";
import AssignmentFormModel from "../FormModel/AssignmentFormModel";
const {
  formField: { title, start_date, end_date, questions, options, type },
} = AssignmentFormModel;

export default [
  Yup.object().shape({
    [title.name]: Yup.string().required(`${title.requiredErrorMsg}`),
    [start_date.name]: Yup.date().required(`${start_date.requiredErrorMsg}`),
    [end_date.name]: Yup.date().required(`${end_date.requiredErrorMsg}`),
    [type.name]: Yup.string().required(`${type.requiredErrorMsg}`),
    [questions.name]: Yup.array().of(
      Yup.object().shape({
        options: Yup.array().of(
          Yup.object().shape({
            title: Yup.string().max(15, "Max 15"),
          })
        ),
      })
    ),
  }),
];
