import { Container } from '@chakra-ui/react';
import UserInfo from '../components/UserInfo';

const UserProfile = () => {
  return (
    <Container maxW="sm" my={5}>
      <UserInfo />
    </Container>
  );
};

export default UserProfile;
