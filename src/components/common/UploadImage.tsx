import { Image, Input, ImageProps } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';

type Props = {
  handleOnChange: (file: File) => void;
};

const UploadImage = ({
  borderRadius,
  handleOnChange,
  ...props
}: Props & ImageProps) => {
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
      <Image
        src={
          selectImageFile
            ? URL.createObjectURL(selectImageFile)
            : 'https://via.placeholder.com/150'
        }
        borderRadius={borderRadius}
        boxSize="150px"
        objectFit="cover"
        onClick={handleUpload}
        {...props}
      />
      <Input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileSelect}
        display="none"
      />
    </>
  );
};

export default UploadImage;
