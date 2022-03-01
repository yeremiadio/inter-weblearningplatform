import { Button } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import instance from "../utils/instance";
import { useToast } from "@chakra-ui/toast";
import Link from "next/link";
import { useRouter } from "next/router";

function verifyEmail() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.user.user.email_verified_at !== null) {
      router.replace("dashboard");
      toast({
        title: "Information",
        description: "Your email has been verified",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [auth]);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    await instance()
      .post("api/verify-email", {})
      .then((res) => {
        toast({
          title: "Success",
          description: res ? res.data : "Check your email",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err
            ? err.response.message
            : "Failed to send the email verification",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  });
  return (
    <div className="z-50 bg-white flex flex-col justify-center items-center h-screen">
      <img
        src="../email-ilus.svg"
        alt=""
        className="object-cover w-3/4 lg:w-1/5 mb-4"
      />
      <div className="flex flex-col gap-4">
        <Button
          colorScheme={"blue"}
          size={"md"}
          onClick={onSubmit}
          isLoading={loading}
          loadingText="Checking"
        >
          Verify Email
        </Button>
        <Link href={"dashboard"}>
          <a className="text-gray-400 text-sm">Back to Dashboard</a>
        </Link>
      </div>
    </div>
  );
}

export default verifyEmail;
