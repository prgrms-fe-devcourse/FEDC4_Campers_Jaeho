import { Center, CenterProps } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type PrimaryIconProps = CenterProps & {
  router: string;
};

const PrimaryIcon = ({ router, children, ...props }: PrimaryIconProps) => {
  const navigate = useNavigate();

  const handleLink = () => {
    navigate(router);
  };

  return (
    <Center {...props} onClick={handleLink}>
      {children}
    </Center>
  );
};

export default PrimaryIcon;
