import { Collapse, CollapseProps, Button } from '@chakra-ui/react';
import { useState } from 'react';

type MoreTextProps = CollapseProps & {
  text: string;
  maxHeight: number;
};

const MoreText = ({ text, maxHeight, ...props }: MoreTextProps) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <Collapse {...props} startingHeight={maxHeight} in={toggle}>
        {text}
      </Collapse>
      <Button size="sm" onClick={handleToggle} mt="1rem">
        더보기
      </Button>
    </>
  );
};

export default MoreText;
