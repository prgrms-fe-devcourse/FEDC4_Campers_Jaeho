import { Image, ImageProps } from '@chakra-ui/react';

const PrimaryImage = ({
  imageSrc = 'https://via.placeholder.com/150',
  ...props
}: ImageProps & { imageSrc: string }) => {
  return <Image boxSize="150px" src={imageSrc} {...props} />;
};

export default PrimaryImage;
