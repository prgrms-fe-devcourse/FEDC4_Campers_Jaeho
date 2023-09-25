import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Text,
} from '@chakra-ui/react';
import PrimaryButton from './PrimaryButton';

type MotionPreset = 'slideInBottom' | 'slideInRight' | 'scale';

type PrimaryAlertDialogSetProps = {
  isOpen: boolean;
  onClose: () => void;
  bodyContentSentences: string[];
  headerContent?: string;
  hasOverlay?: boolean;
  hasCancelButton?: boolean;
  isCentered?: boolean;
  motionPreset?: MotionPreset;
  handleConfirm: () => void;
  handleCancel?: () => void;
};

const PrimaryAlertDialogSet = ({
  isOpen,
  onClose,
  bodyContentSentences,
  headerContent = '',
  hasOverlay = false,
  hasCancelButton = false,
  isCentered = false,
  motionPreset = 'scale',
  handleConfirm,
  handleCancel = onClose,
}: PrimaryAlertDialogSetProps) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        blockScrollOnMount={false}
        closeOnOverlayClick={false}
        motionPreset={motionPreset}
        isCentered={isCentered}
      >
        {hasOverlay && <AlertDialogOverlay />}
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {headerContent}
          </AlertDialogHeader>
          <AlertDialogBody>
            {bodyContentSentences.map((bodyContentSentense, index) => (
              <Text mt={index > 0 ? 1 : 0}>{bodyContentSentense}</Text>
            ))}
          </AlertDialogBody>
          <AlertDialogFooter>
            {hasCancelButton && (
              <PrimaryButton
                mr={3}
                bgColor="blackAlpha.400"
                hoverBgColor="blackAlpha.500"
                ref={cancelRef}
                onClick={handleCancel}
              >
                취소
              </PrimaryButton>
            )}
            <PrimaryButton onClick={handleConfirm}>확인</PrimaryButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PrimaryAlertDialogSet;
