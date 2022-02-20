import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";

const CustomModalChakra = forwardRef(
  ({ isOpen, onOpen, onClose, content, props }, ref) => {
    return (
      <>
        <Modal
          isCentered
          onClose={onClose}
          initialFocusRef={ref}
          isOpen={isOpen}
          motionPreset="slideInBottom"
          {...props}
        >
          <ModalOverlay className="backdrop-blur" />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{JSON.stringify(content)}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
);

export default CustomModalChakra;
