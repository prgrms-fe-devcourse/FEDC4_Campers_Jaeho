import { SearchIcon } from '@chakra-ui/icons';
import { Container, Text } from '@chakra-ui/react';
import NavigationBar from '../components/NavigationBar';
import { ROUTES } from '../constants/routes';
import PrimaryHeader from '../components/common/PrimaryHeader';
import PrimaryLink from '../components/common/PrimaryLink';
import MainPagePosts from '../components/Main/MainPagePosts';
import CircleIconBg from '../components/common/CircleIconBg';

const Main = () => {
  return (
    <Container h="100vh" maxW="container.sm" justifyContent="center" p={0}>
      <PrimaryHeader h="60px">
        <Text fontSize="24px" flexGrow={1}>
          Campers
        </Text>
        <PrimaryLink router={ROUTES.SEARCH}>
          <CircleIconBg>
            <SearchIcon boxSize={5} />
          </CircleIconBg>
        </PrimaryLink>
      </PrimaryHeader>
      <MainPagePosts />
      <NavigationBar />
    </Container>
  );
};

export default Main;
