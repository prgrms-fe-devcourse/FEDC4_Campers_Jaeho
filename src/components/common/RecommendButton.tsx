import { useState } from 'react';
import { Button, ButtonProps, Text, Icon } from '@chakra-ui/react';
import { MdThumbUp } from 'react-icons/md';
import { useRecommend } from '../../hooks/mutation/useRecommend';
import { useNotification } from '../../hooks/query/useNotification';
import { useUserInfoContext } from '../../contexts/UserInfoProvider';
import { LikeResponse } from '../../types/post';
type RecommendButtonProps = ButtonProps & {
  postId: string;
  recommendCount: number;
  isRecommended: boolean;
  likeId: string;
  likeInfo?: LikeResponse[];
};

const RecommendButton = ({
  likeInfo,
  postId,
  recommendCount,
  isRecommended,
  ...props
}: RecommendButtonProps) => {
  const [count, setCount] = useState(recommendCount);
  const [likeId, setLikeId] = useState('');
  const [isClicked, setIsClicked] = useState(isRecommended);
  const { createRecommend, deleteRecommend } = useRecommend();
  const { createNewNotification } = useNotification();
  const { userInfo } = useUserInfoContext();

  const handleToggleClicked = async () => {
    console.log('postId', postId, 'likeId', likeId, likeInfo);
    if (isClicked) {
      setCount((prev) => prev - 1);
      setIsClicked(false);
      setLikeId('');
      deleteRecommend.mutate(likeId);
      if (likeId !== null && userInfo !== null) {
        createRecommend.mutate(postId);
        createNewNotification.mutate({
          notificationType: 'LIKE',
          notificationTypeId: likeId,
          userId: userInfo._id,
          postId: postId,
        });
      }
    } else {
      setCount((prev) => prev + 1);
      setIsClicked(true);

      if (likeId !== null && userInfo !== null) {
        createRecommend.mutate(postId);
        createNewNotification.mutate({
          notificationType: 'LIKE',
          notificationTypeId: likeId,
          userId: userInfo._id,
          postId: postId,
        });
      }
    }
  };

  return (
    <Button {...props} onClick={userInfo ? handleToggleClicked : undefined}>
      <Icon as={MdThumbUp} color={isClicked ? 'orange' : 'black'} mr={2} />
      <Text>{count}</Text>
    </Button>
  );
};

export default RecommendButton;
