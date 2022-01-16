import { Button } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import instance from "../utils/instance";
import { useToast } from "@chakra-ui/toast";

function verifyEmail() {
  const [loading, setLoading] = useState(false);
  const tokenEmail = useSelector((state) => state.email.access_token);
  const toast = useToast();
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    instance()
      .post("api/verify-email", {})
      .then((res) => {
        toast({
          title: "Success",
          description: res.data,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTime(60);
        setLoading(false);
      });
  });
  return (
    <div className="z-50 bg-white flex flex-col justify-center items-center h-screen">
      <img
        src="../email-ilus.svg"
        alt=""
        className="object-cover w-3/4 lg:w-1/5 mb-4"
      />
      <Button
        colorScheme={"blue"}
        size={"md"}
        onClick={onSubmit}
        isLoading={loading}
        loadingText="Checking"
      >
        Verify Email
      </Button>
    </div>
  );
}

export default verifyEmail;
