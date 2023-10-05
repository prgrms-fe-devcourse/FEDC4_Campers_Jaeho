import { Collapse, Button, useBoolean } from '@chakra-ui/react';
import { ComponentProps, useEffect, useRef } from 'react';

const MoreText = ({ children, ...props }: ComponentProps<typeof Collapse>) => {
  const [isExtanded, setIsExtanded] = useBoolean();
  const [isExtandNeed, setIsExtandNeed] = useBoolean();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const firstChildElement = ref.current.firstChild as HTMLElement;

      if (firstChildElement) {
        const parentElementHeight = ref.current.offsetHeight;
        const childElementHeight = firstChildElement.offsetHeight;
        if (parentElementHeight < childElementHeight) setIsExtandNeed.on();
      }
    }
  }, []);

  return (
    <>
      <Collapse in={isExtanded} ref={ref} {...props}>
        {children}
      </Collapse>
      {isExtandNeed && (
        <Button size="sm" onClick={setIsExtanded.toggle} mt={4}>
          {isExtanded ? '줄이기' : '더보기'}
        </Button>
      )}
    </>
  );
};

export default MoreText;
