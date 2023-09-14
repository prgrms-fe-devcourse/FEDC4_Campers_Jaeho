import { Center, CenterProps } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type PrimaryIconProps = CenterProps & {
  color: string;
  router: string;
};
const PrimaryIcon = ({ color, router, children }: PrimaryIconProps) => {
  const navigate = useNavigate();

  const handleLink = () => {
    navigate(router);
  };

  return (
    <Center flex="1" onClick={handleLink} color={color}>
      {children}
    </Center>
  );
};

export default PrimaryIcon;
