import { Center, CenterProps } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type PrimaryLinkProps = CenterProps & {
  router: string | number;
};

const PrimaryLink = ({ router, children, ...props }: PrimaryLinkProps) => {
  const navigate = useNavigate();

  const handleLink = () => {
    navigate(router as string);
  };

  return (
    <Center {...props} onClick={handleLink}>
      {children}
    </Center>
  );
};

export default PrimaryLink;
