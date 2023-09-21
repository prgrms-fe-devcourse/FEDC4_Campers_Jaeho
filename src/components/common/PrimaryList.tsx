import { BoxProps, ListItem, Flex } from '@chakra-ui/react';
import PrimaryAvatar, { AvatarImageProps } from './PrimaryAvatar';

type PrimaryListProps = BoxProps & AvatarImageProps;

const PrimaryList = ({
  width = '20px',
  isOnline,
  userId,
  src,
  onClick,
  children,
  ...props
}: PrimaryListProps) => {
  return (
    <ListItem {...props} onClick={onClick}>
      <Flex>
        <PrimaryAvatar
          width={width}
          isOnline={isOnline}
          userId={userId}
          src={src}
        />
        {children}
      </Flex>
    </ListItem>
  );
};

export default PrimaryList;
