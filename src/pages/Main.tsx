import { SearchIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import NavigationBar from '../components/NavigationBar';
import { ROUTES } from '../constants/routes';
import PrimaryHeader from '../components/common/PrimaryHeader';
import PrimaryLink from '../components/common/PrimaryLink';
import MainPagePosts from '../components/Main/MainPagePosts';

function Main() {
  return (
    <>
      <PrimaryHeader h="60px" p="0 15px">
        <Text fontSize="24px" flexGrow="1">
          Campers
        </Text>
        <PrimaryLink router={ROUTES.SEARCH}>
          <SearchIcon
            boxSize={8}
            cursor="pointer"
            p="5px"
            borderRadius="15px"
          />
        </PrimaryLink>
      </PrimaryHeader>
      <MainPagePosts />
      <NavigationBar />
    </>
  );
}

export default Main;
