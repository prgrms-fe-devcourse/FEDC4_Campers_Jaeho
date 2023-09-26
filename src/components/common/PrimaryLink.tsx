import { Box } from '@chakra-ui/react';
import { ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom';

type PrimaryLinkProps = ComponentProps<typeof Box> & {
  router: string | number;
};

const PrimaryLink = ({ router, children, ...props }: PrimaryLinkProps) => {
  const navigate = useNavigate();

  const handleLink = () => {
    navigate(router as string);
  };

  return (
    <Box {...props} onClick={handleLink}>
      {children}
    </Box>
  );
};

export default PrimaryLink;
