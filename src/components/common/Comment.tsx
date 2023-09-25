import {
  Box,
  Flex,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';
import { FaEllipsisV } from 'react-icons/fa';
import PrimaryAvatar from './PrimaryAvatar';
import PrimaryText from './PrimaryText';
import PrimaryButton from './PrimaryButton';
const Comment = ({
  comment,
  image,
  isOnline,
  name,
  userId,
  handleDelete,
}: {
  name: string;
  comment: string;
  image: string;
  isOnline: boolean;
  userId: string;
}) => {
  const onHandleDelete = () => {
    handleDelete(userId);
  };

  return (
    <Flex bg="#ECE9E9" maxW="100%" p={2}>
      <PrimaryAvatar
        src={image}
        isOnline={isOnline}
        size={'sm'}
        userId={userId}
      />
      <Box>
        <PrimaryText children={name} />
        <PrimaryText children={comment} />
      </Box>
      <Spacer />
      <Popover>
        <PopoverTrigger>
          <Button bg="#green.400">
            <FaEllipsisV />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <PrimaryButton handleClick={onHandleDelete}>Delete!!</PrimaryButton>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Comment;
