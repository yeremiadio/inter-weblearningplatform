import { Button, IconButton, useMediaQuery } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import CustomSpinner from "./Spinner/BlueSpinner";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ReactPdfViewerComponent = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)");

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Document
        loading={<CustomSpinner />}
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} scale={isLargerThan1024 ? 1.0 : 0.5} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div className="mt-2">
        <div className="flex gap-2 mt-2">
          {pageNumber > numPages && (
            <IconButton
              rounded={"full"}
              variant="ghost"
              colorScheme={"blue"}
              icon={<ChevronLeftIcon className="w-5 h-5" />}
              onClick={() =>
                pageNumber > numPages && setPageNumber((prev) => prev - 1)
              }
            />
          )}
          {pageNumber < numPages && (
            <IconButton
              rounded={"full"}
              colorScheme={"blue"}
              variant="ghost"
              icon={<ChevronRightIcon className="w-5 h-5" />}
              onClick={() => setPageNumber((prev) => prev + 1)}
            />
          )}
        </div>
        <a href={`${url}`} download="MyExampleDoc" target="_blank">
          <Button colorScheme={"blue"} size="md">
            Download
          </Button>
        </a>
      </div>
    </div>
  );
};

export default ReactPdfViewerComponent;
