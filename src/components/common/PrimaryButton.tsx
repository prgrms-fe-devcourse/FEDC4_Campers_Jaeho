import { ComponentProps } from 'react';
import { Button } from '@chakra-ui/react';

type PrimaryButtonProps = ComponentProps<typeof Button> & {
  hoverBgColor?: string;
};

const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => {
  return (
    <Button
      my={2}
      px={[4, 8]}
      bgColor="green.400"
      color="white"
      _hover={{
        bgColor: 'green.500',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
