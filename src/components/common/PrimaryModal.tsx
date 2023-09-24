import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalProps,
  // useDisclosure,
} from '@chakra-ui/react';

const PrimaryModal = ({ children, isOpen, onClose }: ModalProps) => {
  // const { isOpen, onClose } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent m="20px" overflow="hidden">
        {children}
      </ModalContent>
    </Modal>
  );
};

export default PrimaryModal;
