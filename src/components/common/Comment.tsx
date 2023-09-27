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
import { useUserInfoContext } from '../../contexts/UserInfoProvider';
const Comment = ({
  _id,
  comment,
  image,
  isOnline,
  name,
  author,
}: {
  _id: string;
  name: string;
  comment: string;
  image: string;
  isOnline: boolean | null;
  author: string;
}) => {
  const { DeleteComment } = useComment();
  const onHandleDelete = () => {
    if (userInfo !== null && userInfo?._id === author) {
      DeleteComment.mutate(_id);
    }
  };
  const { userInfo } = useUserInfoContext();
  console.log('commentid', _id, userInfo?._id);

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
