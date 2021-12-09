import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  return (
    <>
      <h1>404 - Page Not Found</h1>
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
