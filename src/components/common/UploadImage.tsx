import { ChangeEvent, useRef, useState } from 'react';
import { Image, Input, Box, ImageProps } from '@chakra-ui/react';
import { AiOutlineUpload } from 'react-icons/ai';
import AbsoluteCenterBox from './AbsoluteCenterBox';

type UploadImageProps = ImageProps & {
  isUploadDisable?: boolean;
  size?: string;
  handleOnChange: (file: File) => void;
};

const UploadImage = ({
  handleOnChange,
  borderRadius,
  isUploadDisable = false,
  size = '150px',
  ...props
}: UploadImageProps) => {
  const [selectImageFile, setSelectImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFile = event.target.files[0];
      setSelectImageFile(newFile);
      handleOnChange(newFile);
    }
  };

  return (
    <>
      <Box
        overflow="hidden"
        borderRadius={borderRadius}
        pos="relative"
        boxSize={size}
        border="1px solid rgba(122,122,122,0.4)"
      >
        <Image
          src={
            (selectImageFile && URL.createObjectURL(selectImageFile)) ??
            '../../src/assets/images/no_image.png'
          }
          w="100%"
          h="100%"
          pos="absolute"
          objectFit="cover"
          {...props}
        />
        <Input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileSelect}
          display="none"
        />
        {!isUploadDisable && (
          <>
            <AbsoluteCenterBox
              h="100%"
              fontSize="5xl"
              color="white"
              bgColor="rgba(0,0,0,0.5)"
              textAlign="center"
              transition="all 0.3s"
              opacity="0"
              _hover={{ opacity: 1 }}
              cursor="pointer"
              onClick={handleUpload}
            >
              <AbsoluteCenterBox>
                <AiOutlineUpload />
              </AbsoluteCenterBox>
            </AbsoluteCenterBox>
          </>
        )}
      </Box>
    </>
  );
};

export default UploadImage;
