import { AvatarProps, Avatar, AvatarBadge } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export type AvatarImageProps = AvatarProps & {
  size: string;
  userId: string;
  src?: string;
  isOnline: boolean;
};

const AvatarImage = ({
  size,
  isOnline,
  userId,
  src,
  ...props
}: AvatarImageProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Avatar
        {...props}
        onClick={() => navigate(`/user/${userId}`)}
        size={size}
        src={src}
        fallbackSrc="https://bit.ly/broken-link"
        name="avatar_image"
        marginRight={isOnline ? undefined : '2'}
      >
        {isOnline && <AvatarBadge boxSize="1.25em" bg="green.500" />}
      </Avatar>
    </>
  );
};

export default AvatarImage;
