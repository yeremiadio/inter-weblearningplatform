import { Button } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function EmptyDataComponent({
  title,

  href = "/",
  isAddable = true,
}) {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  return (
    <div className="z-50 flex flex-col justify-center items-center mt-16 lg:mt-24">
      <img
        src={"../emptyState.svg"}
        alt=""
        className="object-cover w-3/4 lg:w-1/5 mb-4"
      />
      <h3 className="font-bold text-2xl mb-6">
        {title ? title : `Oops kosong dong`}
      </h3>

      <Button
        colorScheme="blue"
        leftIcon={isAddable && <PlusIcon className="w-4 h-4" />}
        onClick={() =>
          auth.user.user.roles[0].name !== "student" && isAddable
            ? router.push(href)
            : router.replace("dashboard")
        }
      >
        {auth.user.user.roles[0].name !== "student" && isAddable
          ? `Tambah`
          : "Back to Dashboard"}
      </Button>
    </div>
  );
}

export default EmptyDataComponent;
