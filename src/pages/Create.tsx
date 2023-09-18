import { Container } from '@chakra-ui/react';
import CreatePost from '../components/CreatePost';

const Create = () => {
  return (
    <Container maxW="container.sm" mt="5">
      <CreatePost />
    </Container>
  );
};

export default Create;
