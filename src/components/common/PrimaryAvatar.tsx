import { AvatarProps, Avatar, AvatarBadge } from '@chakra-ui/react';
import PrimaryLink from './PrimaryLink';

type AvatarImageProps = AvatarProps & {
  userId?: string;
  isOnline: boolean;
};

const PrimaryAvatar = ({
  userId,
  isOnline,
  src,
  name,
  ...props
}: AvatarImageProps) => {
  return (
    <PrimaryLink router={userId ? `/users/${userId}` : ''}>
      <Avatar
        src={src || 'https://bit.ly/broken-link'}
        name={name}
        mr={isOnline ? undefined : 2}
        {...props}
      >
        {isOnline && <AvatarBadge boxSize={4} bg="green.500" />}
      </Avatar>
    </PrimaryLink>
  );
};

export default PrimaryAvatar;
