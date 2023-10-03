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
  const { userInfo } = useUserInfoContext();
  const {
    createRecommend: {
      mutate: createRecommendMutate,
      data: createRecommendData,
    },
    deleteRecommend: { mutate: deleteRecommendMutate },
  } = useRecommend();
  const { createNewNotification } = useNotification();

  // 유저가 로그인 했을시, 디바운스리퀘스트. 아니면 토스트 띄우기
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
      // 예상되는 서버의 내 좋아요 상태와, 지금 상태가 일치하면 굳이 리퀘 안 날림
      if (isLikedOnServer !== isLiked) {
        if (isLiked) {
          createRecommendMutate(postId);
        } else {
          const id = likeInfo.find(({ user }) => user === userInfo?._id)?._id;
          if (id) deleteRecommendMutate(id);
        }
        // 일단 성공 여부와 관계없이 서버 예상 상태 변환
        setIsLikedOnServer(isLiked);
      }
    }, 500),
    []
  );

  // 알림
  useEffect(() => {
    if (createRecommendData && userInfo) {
      createNewNotification.mutate({
        notificationType: 'LIKE',
        notificationTypeId: createRecommendData.data._id,
        userId: userInfo._id,
        postId: postId,
      });
    }
  }, [createRecommendData]);

  // 초기세팅. 유저의 로그인 여부, 좋아요 여부를 확인하고 권한, 변수세팅
  useEffect(() => {
    const userID = userInfo?._id;
    const isAreadyILike =
      userID && likeInfo.find(({ user }) => user === userID) ? 1 : 0;
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
