import { Button } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";

function BackButton() {
  const router = useRouter();

  const backtoPrevPage = () => router.back();
  return (
    <Button
      className="mb-4"
      onClick={backtoPrevPage}
      leftIcon={<ArrowLeftIcon className="w-5 h-5" />}
    >
      Back
    </Button>
  );
}

export default BackButton;
