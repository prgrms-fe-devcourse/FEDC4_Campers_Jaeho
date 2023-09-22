import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import PrimaryButton from './PrimaryButton';

type MotionPreset = 'slideInBottom' | 'slideInRight' | 'scale';

type PrimaryAlertDialogSetProps = {
  isOpen: boolean;
  onClose: () => void;
  bodyContent: string;
  headerContent?: string;
  hasOverlay?: boolean;
  hasCancelButton?: boolean;
  isCentered?: boolean;
  motionPreset?: MotionPreset;
};

const PrimaryAlertDialogSet = ({
  isOpen,
  onClose,
  bodyContent,
  headerContent = '',
  hasOverlay = false,
  hasCancelButton = false,
  isCentered = false,
  motionPreset = 'scale',
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
          <AlertDialogBody>{bodyContent}</AlertDialogBody>
          <AlertDialogFooter>
            {hasCancelButton && (
              <PrimaryButton
                mr={3}
                bgColor="blackAlpha.400"
                hoverBgColor="blackAlpha.500"
                ref={cancelRef}
                onClick={onClose}
              >
                취소
              </PrimaryButton>
            )}
            <PrimaryButton onClick={onClose}>확인</PrimaryButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PrimaryAlertDialogSet;
