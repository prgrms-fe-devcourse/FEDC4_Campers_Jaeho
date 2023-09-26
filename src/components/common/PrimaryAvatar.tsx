import { AvatarProps, Avatar, AvatarBadge } from '@chakra-ui/react';

type AvatarImageProps = AvatarProps & {
  isOnline: boolean;
};

const PrimaryAvatar = ({ isOnline, ...props }: AvatarImageProps) => {
  return (
    <Avatar {...props}>
      {isOnline && <AvatarBadge boxSize={4} bg="green.500" />}
    </Avatar>
  );
};

export default PrimaryAvatar;
