import { Button } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

function EmptyDataComponent({ title = "Data", href = "/" }) {
  const router = useRouter();
  return (
    <div className="z-50 flex flex-col justify-center items-center mt-16 lg:mt-24">
      <img
        src="../emptyState.svg"
        alt=""
        className="object-cover w-3/4 lg:w-1/5 mb-4"
      />
      <h3 className="font-bold text-2xl mb-6">Oops {title} kosong</h3>
      <Button
        colorScheme="blue"
        leftIcon={<PlusIcon className="w-4 h-4" />}
        onClick={() => router.push(href)}
      >
        Tambah {title}
      </Button>
    </div>
  );
}

export default EmptyDataComponent;
