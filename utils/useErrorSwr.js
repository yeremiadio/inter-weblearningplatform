import { useToast } from "@chakra-ui/toast";
import React, { useEffect } from "react";

const useErrorSwr = (error) => {
  const toast = useToast();
  const errorMsg = `${error?.message}`;
  const errorStatus = +errorMsg.split(" ")[5];
  const initialStateToast = {
    title: "Error",
    status: "error",
    isClosable: true,
    duration: 3000,
  };
  useEffect(() => {
    switch (errorStatus) {
      case 401:
        return toast({
          ...initialStateToast,
          description: "Unauthenticated",
        });
      case 404:
        return toast({
          ...initialStateToast,
          description: "Data not found",
        });
      case 403:
        return toast({
          
          ...initialStateToast,
          description: "You don't have this permission or your email not verified",
        });

      default:
        break;
    }
  }, [error]);

  return {
    errorMessage: errorMsg,
    errorStatus: errorStatus !== NaN && errorStatus,
  };
};

export default useErrorSwr;
