import { useState } from 'react';
import { Button, ButtonProps, Text, Icon, useBoolean } from '@chakra-ui/react';
import { MdThumbUp } from 'react-icons/md';

type RecommendButtonProps = ButtonProps & {
  recommendCount: number;
  isRecommended: boolean;
};

const RecommendButton = ({
  recommendCount,
  isRecommended,
  ...props
}: RecommendButtonProps) => {
  const [count, setCount] = useState(recommendCount);
  const [isClicked, setIsClicked] = useBoolean(isRecommended);
  const [isClicking, setIsClicking] = useBoolean();

  const handleToggleClicked = () => {
    if (isClicking) return;

    setIsClicking.on();

    if (isClicked) {
      // 비동기 통신

      setCount((prev) => prev - 1);
      setIsClicked.off();
    } else {
      // 비동기 통신

      setCount((prev) => prev + 1);
      setIsClicked.on();
    }

    setIsClicking.off();
  };

  return (
    <Button {...props} onClick={handleToggleClicked}>
      <Icon as={MdThumbUp} color={isClicked ? 'orange' : 'black'} mr={2} />
      <Text>{count}</Text>
    </Button>
  );
};

export default RecommendButton;
