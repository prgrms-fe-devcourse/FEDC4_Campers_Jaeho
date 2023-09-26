import { Image, ImageProps } from '@chakra-ui/react';
const PrimaryImage = ({
  imageSrc,
  ...props
}: ImageProps & { imageSrc: string }) => {
  return (
    <Image
      {...props}
      boxSize="150px"
      src={imageSrc ?? 'https://via.placeholder.com/150'}
    />
  );
};

export default PrimaryImage;
