import { Collapse, CollapseProps, Button, useBoolean } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

const MoreText = ({ children, ...props }: CollapseProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isToggled, setIsToggled] = useBoolean();
  const [isNeedToggle, setIsNeedToggle] = useBoolean(true);
  const handleToggle = () => {
    setIsToggled.toggle();
  };
  useEffect(() => {
    if (ref.current) {
      const firstChild = ref.current.firstChild as HTMLElement;
      if (firstChild) {
        const parentHeight = ref.current.offsetHeight;
        const childHeight = firstChild.offsetHeight;
        if (parentHeight >= childHeight) setIsNeedToggle.off();
      }
    }
  }, [children]);

  return (
    <>
      <Collapse in={isToggled} ref={ref} {...props}>
        {children}
      </Collapse>
      {isNeedToggle && (
        <Button size="sm" onClick={handleToggle} mt={4}>
          {isToggled}더보기
        </Button>
      )}
    </>
  );
};

export default MoreText;
