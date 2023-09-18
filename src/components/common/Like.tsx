import { Button, ButtonProps, Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { useState } from 'react';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
type LikeProps = ButtonProps & {
  likeCount: number;
};

const Like = ({ likeCount, ...props }: LikeProps) => {
  const [count, setCount] = useState(likeCount);
  const [like, setLike] = useState(false);
  const handleToggle = () => {
    if (like) {
      // 비동기 통신
      setCount((prev: number) => prev - 1);
    } else {
      // 비동기 통신
      setCount((prev: number) => prev + 1);
    }
    setLike((prev: boolean) => !prev);
  };

  return (
    <Button {...props} onClick={handleToggle}>
      <Icon
        as={BsFillHandThumbsUpFill}
        marginRight="2"
        color={like ? 'green.400' : 'blackAlpha.400'}
      />
      <Text>{count}</Text>
    </Button>
  );
};

export default Like;
