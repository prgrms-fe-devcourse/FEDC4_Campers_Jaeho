import { AvatarProps, Avatar, AvatarBadge } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type AvatarImageProps = AvatarProps & {
  userId: string;
  isOnline: boolean;
};

const PrimaryAvatar = ({
  userId,
  isOnline,
  size,
  src,
  name,
  ...props
}: AvatarImageProps) => {
  const navigate = useNavigate();

  return (
    <Avatar
      {...props}
      onClick={() => navigate(`/user/${userId}`)}
      size={size}
      src={src || 'https://bit.ly/broken-link'}
      name={name}
      mr={isOnline ? undefined : 2}
    >
      {isOnline && <AvatarBadge boxSize={4} bg="green.500" />}
    </Avatar>
  );
};

export default PrimaryAvatar;
