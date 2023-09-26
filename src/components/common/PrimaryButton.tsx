import { ComponentProps } from 'react';
import { Button } from '@chakra-ui/react';

type PrimaryButtonProps = ComponentProps<typeof Button> & {
  hoverBgColor?: string;
};

const PrimaryButton = ({
  children,
  bgColor = 'green.400',
  hoverBgColor = 'green.500',
  onClick,
  ...props
}: PrimaryButtonProps) => {
  return (
    <Button
      {...props}
      my={2}
      px={[4, 8]}
      bgColor={bgColor}
      color="white"
      onClick={onClick}
      _hover={{
        bgColor: hoverBgColor,
      }}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
