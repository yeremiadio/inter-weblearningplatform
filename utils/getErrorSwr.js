export const getErrorSwr = (error) => {
  const errorMsg = `${error?.message}`;

  const errorStatus = +errorMsg.split(" ")[5];

  return {
    errorMessage: errorMsg,
    errorStatus: errorStatus !== NaN && errorStatus,
  };
};
