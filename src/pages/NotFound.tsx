import { useNavigate } from 'react-router-dom';
import { Container, Image, Text } from '@chakra-ui/react';
import NotFoundImage from '../assets/images/not_found.png';
import PrimaryButton from '../components/common/PrimaryButton';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container h="100vh" centerContent justifyContent="center">
      <Image src={NotFoundImage} />
      <Text fontSize={[20, 25]} fontWeight={700} marginBottom={2}>
        여기가 어디죠...
      </Text>
      <Text color="blackAlpha.600" fontSize={[13, 18]} marginBottom={10}>
        무언가 문제가 있는 것 같아요..!
      </Text>
      <PrimaryButton onClick={() => navigate('/')}>
        홈으로 돌아가기
      </PrimaryButton>
    </Container>
  );
};

export default NotFound;
