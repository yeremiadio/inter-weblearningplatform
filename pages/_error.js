import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const MyCustomError = () => {
  const router = useRouter();
  return (
    <>
      <h1>500 - Server-side error occurred</h1>
      <Button
        colorScheme="blue"
        className="mt-2 ml-auto"
        onClick={() => router.back()}
      >
        Kembali
      </Button>
    </>
  );
};

export default MyCustomError;
