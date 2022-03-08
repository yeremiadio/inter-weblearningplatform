import { Button } from "@chakra-ui/button";
import { InformationCircleIcon } from "@heroicons/react/solid";

function SubmitAssignmentModal({ parent, handleData, isLoading }) {
  return (
    <>
      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:flex sm:items-start">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
          <InformationCircleIcon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Submit Confirmation
          </h3>
          <p className="text-sm text-secondary">
            Are you sure you want to submit this assignment? This action cannot
            be undone.
          </p>
        </div>
      </div>
      <div className="p-4 bg-gray-100 flex justify-end gap-2">
        <Button colorScheme="gray" onClick={() => parent.current.close()}>
          Cancel
        </Button>
        <Button
          colorScheme="blue"
          isLoading={isLoading}
          loadingText="Submitting..."
          onClick={handleData}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default SubmitAssignmentModal;
