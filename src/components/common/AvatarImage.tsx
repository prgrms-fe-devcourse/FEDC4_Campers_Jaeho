import { ImageProps, Image, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export type AvatarImageProrps = ImageProps & {
  width: string;
  userId: string;
  src?: string;
  isOnline: boolean;
};

const AvatarImage = ({
  width,
  isOnline,
  userId,
  src,
  ...props
}: AvatarImageProrps) => {
  const navigate = useNavigate();

  return (
    <>
      <Image
        {...props}
        onClick={() => navigate(`/user/${userId}`)}
        width={width}
        borderRadius="50%"
        src={src}
        fallbackSrc="https://via.placeholder.com/20"
        alt="avatar_image"
        marginRight={isOnline ? undefined : '2'}
      />
      {/* css 수정 */}
      {isOnline && (
        <Box
          width="5px"
          height="5px"
          backgroundColor="green.400"
          borderRadius="50%"
          position="relative"
          top="10"
          right="2"
        />
      )}
    </>
  );
};

export default AvatarImage;
