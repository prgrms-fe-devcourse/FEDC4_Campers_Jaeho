import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';
import PrimaryAvatar from './PrimaryAvatar';
import PrimaryLink from './PrimaryLink';
import { useComment } from '../../hooks/mutation/useComment';
import { ROUTES } from '../../constants/routes';
import { User } from '../../types/user';

const Comment = ({
  userInfo,
  comment,
  image,
  isOnline,
  fullName,
  _id,
  author_id,
}: {
  userInfo: User | null;
  fullName: string;
  comment: string;
  image: string;
  isOnline: boolean;
  _id: string;
  author_id: string;
}) => {
  const { DeleteComment } = useComment();
  const onHandleDelete = (_id: string) => {
    DeleteComment.mutate(_id);
  };

  return (
    <>
      <Flex py="10px" pos="relative" key={_id}>
        <PrimaryLink router={ROUTES.USER_INFO(author_id)}>
          <PrimaryAvatar
            src={image ?? '../../src/assets/images/avatar_dear.jpg'}
            isOnline={!!isOnline}
            boxSize="40px"
            mr="15px"
            transition="all 0.1s"
            _hover={{ border: '2px solid #28B67E' }}
          />
        </PrimaryLink>
        <Stack flex={1}>
          <Text fontWeight="bold">{fullName}</Text>
          <Text>{comment}</Text>
        </Stack>
        <Flex w="50px" h="100%" justify="center" fontSize="24">
          {userInfo?._id === author_id && (
            <Box
              color="gray.500"
              _hover={{ color: 'black' }}
              onClick={() => onHandleDelete(_id)}
            >
              <AiOutlineClose />
            </Box>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Comment;
