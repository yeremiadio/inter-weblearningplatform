import { Button } from "@chakra-ui/button";

import instance from "../../../../utils/instance";
import { sleep } from "../../../../utils/sleep";
import { useState, useCallback } from "react";
import { ExclamationIcon } from "@heroicons/react/solid";

function DeletePageModal({ parent, slug, name, mutate, pages, toast }) {
  const [isLoading, setLoading] = useState(false);
  const deletePage = useCallback(async () => {
    setLoading(true);
    await sleep(1000);
    instance()
      .delete(`api/admin/pages/${slug}/delete`)
      .then((res) => {
        toast({
          title: "Success",
          description: res.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        parent.current.close();
        mutate([...pages.filter((item) => item.slug !== slug)], false);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, []);
  return (
    <>
      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:flex sm:items-start">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationIcon className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Delete Confirmation
          </h3>
          <p className="text-sm text-secondary">
            Are you sure you want to delete this user? This user name{" "}
            <b>{name}</b> will be permanently removed. This action cannot be
            undone.
          </p>
        </div>
      </div>
      <div className="p-4 bg-gray-100 flex justify-end gap-2">
        <Button colorScheme="gray" onClick={() => parent.current.close()}>
          Cancel
        </Button>
        <Button
          colorScheme="red"
          isLoading={isLoading}
          loadingText="Deleting..."
          onClick={deletePage}
        >
          Delete
        </Button>
      </div>
    </>
  );
}

export default DeletePageModal;
