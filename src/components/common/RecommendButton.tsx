import { useState, useEffect, useCallback } from 'react';
import { useRecommend } from '../../hooks/mutation/useRecommend';
import { debounce } from 'lodash';
import { AiTwotoneLike } from 'react-icons/ai';
import { Flex, Text, Button, ButtonProps, useToast } from '@chakra-ui/react';
import { useUserInfoContext } from '../../contexts/UserInfoProvider';
import { useNotification } from '../../hooks/query/useNotification';

type RecommendButtonProps = ButtonProps & {
  postId: string;
  likeInfo: {
    user: string;
    _id: string;
  }[];
};

const RecommendButton = ({
  likeInfo,
  postId,
  ...props
}: RecommendButtonProps) => {
  const toast = useToast();
  const [isLikedOnServer, setIsLikedOnServer] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikeCnt, setTotalLikeCnt] = useState(0);
  const [likeId, setLikeId] = useState('');
  const { userInfo } = useUserInfoContext();
  const {
    createRecommend: {
      mutate: createRecommendMutate,
      data: createRecommendData,
    },
    deleteRecommend: { mutate: deleteRecommendMutate },
  } = useRecommend();
  const { createNewNotification } = useNotification();

  const handleClickLikeBtn = () => {
    if (userInfo) {
      handleLike(isLikedOnServer, !isLiked);
      setIsLiked(!isLiked);
    } else {
      toast({
        title: '회원이시라면 추천하실 수 있어요!',
        description: '계정이 필요하신가요? >>',
        status: 'info',
        duration: 3000,
        isClosable: true,
        colorScheme: 'green',
      });
    }
  };
  const handleLike = useCallback(
    debounce((isLikedOnServer: boolean, isLiked: boolean) => {
      if (isLikedOnServer !== isLiked) {
        if (isLiked) {
          createRecommendMutate(postId);
        } else {
          if (likeId) deleteRecommendMutate(likeId);
        }
        setIsLikedOnServer(isLiked);
      }
    }, 500),
    [likeId]
  );

  useEffect(() => {
    if (createRecommendData && userInfo) {
      createNewNotification.mutate({
        notificationType: 'LIKE',
        notificationTypeId: createRecommendData.data._id,
        userId: userInfo._id,
        postId,
      });
      setLikeId(createRecommendData.data._id);
    }
  }, [createRecommendData]);

  useEffect(() => {
    const userID = userInfo?._id;
    const beforeLikeId = likeInfo.find(({ user }) => user === userID)?._id;
    const isAreadyILike = userID && beforeLikeId ? 1 : 0;
    if (beforeLikeId) setLikeId(beforeLikeId);
    setIsLiked(!!isAreadyILike);
    setTotalLikeCnt(likeInfo.length - isAreadyILike);
    setIsLikedOnServer(!!isAreadyILike);
  }, [userInfo]);

  return (
    <Button onClick={handleClickLikeBtn} {...props}>
      <Flex>
        <Flex fontSize="20px" color={isLiked ? '#DF8D58' : 'none'}>
          <AiTwotoneLike />
        </Flex>
        <Text ml="10px" fontWeight="bold">
          {totalLikeCnt + (isLiked ? 1 : 0)}
        </Text>
      </Flex>
    </Button>
  );
};
export default RecommendButton;
