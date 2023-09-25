import { useState } from 'react';
import { Button, ButtonProps, Text, Icon } from '@chakra-ui/react';
import { MdThumbUp } from 'react-icons/md';
import { useRecommend } from '../../hooks/mutation/useRecommend';
type RecommendButtonProps = ButtonProps & {
  postId: string;
  recommendCount: number;
  isRecommended: boolean;
};

const RecommendButton = ({
  postId,
  recommendCount,
  isRecommended,
  ...props
}: RecommendButtonProps) => {
  const [count, setCount] = useState(recommendCount);
  const [isClicked, setIsClicked] = useState(isRecommended);
  const { createRecommend, deleteRecommend } = useRecommend();
  const handleToggleClicked = async () => {
    if (isClicked) {
      setCount((prev) => prev - 1);
      setIsClicked(false);
      deleteRecommend.mutate(postId);
    } else {
      setCount((prev) => prev + 1);
      setIsClicked(true);
      createRecommend.mutate(postId);
    }
  };

  return (
    <Button {...props} onClick={handleToggleClicked}>
      <Icon as={MdThumbUp} color={isClicked ? 'orange' : 'black'} mr={2} />
      <Text>{count}</Text>
    </Button>
  );
};

export default RecommendButton;
