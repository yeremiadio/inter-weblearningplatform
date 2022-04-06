import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Custom500() {
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
}
