import { useState } from 'react';
import { Flex, FlexProps, Text, Box } from '@chakra-ui/react';
import { useRecommend } from '../../hooks/mutation/useRecommend';
import { useNotification } from '../../hooks/query/useNotification';
import { useUserInfoContext } from '../../contexts/UserInfoProvider';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai';

type RecommendButtonProps = FlexProps & {
  postId: string;
  isRecommended: boolean;
  likeInfo?: {
    user: string;
    _id: string;
  }[];
};

const RecommendButton = ({
  likeInfo,
  postId,
  isRecommended,
  ...props
}: RecommendButtonProps) => {
  const [count, setCount] = useState(likeInfo?.length ? likeInfo.length : 0);
  const [isClicked, setIsClicked] = useState(isRecommended);
  const { createRecommend, deleteRecommend } = useRecommend();
  const { createNewNotification } = useNotification();
  const { userInfo } = useUserInfoContext();

  const handleToggleClicked = () => {
    if (
      createRecommend.isLoading ||
      deleteRecommend.isLoading ||
      createRecommend.isError ||
      deleteRecommend.isError
    )
      return;
    const idx = likeInfo?.findIndex((idx) => idx.user === userInfo?._id);
    if (isClicked === true && idx !== undefined && likeInfo !== undefined) {
      setCount(count - 1);
      console.log(isClicked);
      deleteRecommend.mutate(likeInfo[idx]._id);
      if (likeInfo[idx] !== null && userInfo !== null) {
        createNewNotification.mutate({
          notificationType: 'LIKE',
          notificationTypeId: likeInfo[idx].user,
          userId: userInfo._id,
          postId: postId,
        });
      }
      setIsClicked(false);
    } else {
      setCount(count + 1);
      if (
        likeInfo &&
        idx !== undefined &&
        likeInfo[idx] !== null &&
        userInfo !== null
      ) {
        createRecommend.mutate(postId);
        createNewNotification.mutate({
          notificationType: 'LIKE',
          notificationTypeId: likeInfo[idx].user,
          userId: userInfo._id,
          postId: postId,
        });
      }
      setIsClicked(true);
    }
  };

  return (
    <>
      <Flex
        bgColor="gray.100"
        align="center"
        p="10px 15px"
        borderRadius="30px"
        onClick={() => handleToggleClicked()}
        transition="all 0.3s"
        _hover={{ bgColor: 'gray.300' }}
        {...props}
      >
        <Box
          fontSize="20px"
          color={isClicked ? '#DF8D58' : 'none'}
          onClick={() => {}}
        >
          {isClicked ? <AiTwotoneLike /> : <AiOutlineLike />}
        </Box>
        <Text ml="10px" fontWeight="bold">
          {count}
        </Text>
      </Flex>
    </>
  );
};

export default RecommendButton;
