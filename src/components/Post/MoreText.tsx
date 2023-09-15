import { Collapse, CollapseProps, Button, useBoolean } from '@chakra-ui/react';

type MoreTextProps = CollapseProps & {
  text: string;
  maxHeight: number;
};

const MoreText = ({ text, maxHeight, ...props }: MoreTextProps) => {
  const [toggle, setToggle] = useBoolean(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <Collapse {...props} startingHeight={maxHeight} in={toggle}>
        {text}
      </Collapse>
      <Button size="sm" onClick={handleToggle} mt={4}>
        더보기
      </Button>
    </>
  );
};

export default MoreText;
