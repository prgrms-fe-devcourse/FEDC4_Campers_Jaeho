import { Button, ButtonProps, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useState } from 'react';

type LikeProps = ButtonProps & {
  likeCount: number;
};

const Like = ({ likeCount, ...props }: LikeProps) => {
  const [count, setCount] = useState(likeCount);
  const [like, setLike] = useState(false);
  const [click, setClick] = useState(false);

  const handleToggle = () => {
    if (click) return;
    setClick(true);
    if (like) {
      // 비동기 통신
      setCount((prev: number) => prev - 1);
    } else {
      // 비동기 통신
      setCount((prev: number) => prev + 1);
    }
    setLike((prev: boolean) => !prev);
    setClick(false);
  };

  return (
    <Button {...props} onClick={handleToggle}>
      <CheckIcon color={like ? 'yellow' : 'black'} marginRight="2" />
      <Text>{count}</Text>
    </Button>
  );
};

export default Like;
