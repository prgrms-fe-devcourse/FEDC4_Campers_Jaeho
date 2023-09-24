import { ListItem, Flex, ListItemProps } from '@chakra-ui/react';
import PrimaryAvatar, { AvatarImageProps } from './PrimaryAvatar';

type PrimaryListProps = ListItemProps & AvatarImageProps;

const PrimaryList = ({ onClick, children, ...props }: PrimaryListProps) => {
  return (
    <ListItem onClick={onClick}>
      <Flex>
        <PrimaryAvatar w="20px" {...props} />
        {children}
      </Flex>
    </ListItem>
  );
};

export default PrimaryList;
