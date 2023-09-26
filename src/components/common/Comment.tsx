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
import { useComment } from '../../hooks/mutation/useComment';

const Comment = ({
  comment,
  image,
  isOnline,
  name,
  userId,
}: {
  name: string;
  comment: string;
  image: string;
  isOnline: boolean | null;
  userId: string;
}) => {
  const { DeleteComment } = useComment();
  const onHandleDelete = () => {
    console.log(userId);
    DeleteComment.mutate(userId);
  };

  return (
    <Flex bg="#ECE9E9" maxW="100%" p={2}>
      <PrimaryAvatar src={image} isOnline={isOnline ?? false} size={'sm'} />
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
            <PrimaryButton onClick={onHandleDelete}>Delete!!</PrimaryButton>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Comment;
