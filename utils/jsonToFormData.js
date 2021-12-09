import { buildFormData } from "./buildFormData";

export const jsonToFormData = (data) => {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
};
