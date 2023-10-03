import { AvatarProps, Avatar, AvatarBadge } from '@chakra-ui/react';

type AvatarImageProps = AvatarProps & {
  isOnline: boolean;
};

const PrimaryAvatar = ({
  isOnline,
  src = '../../src/assets/images/avatar_penguin.jpg',
  ...props
}: AvatarImageProps) => {
  return (
    <Avatar src={src} {...props}>
      {isOnline && <AvatarBadge boxSize={4} bg="green.500" />}
    </Avatar>
  );
};

export default PrimaryAvatar;
