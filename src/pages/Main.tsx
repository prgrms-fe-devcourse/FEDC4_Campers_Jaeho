import { SearchIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import NavigationBar from '../components/NavigationBar';
import { ROUTES } from '../constants/routes';
import PrimaryHeader from '../components/common/PrimaryHeader';
import PrimaryLink from '../components/common/PrimaryLink';
import MainPagePosts from '../components/Main/MainPagePosts';
import CircleIconBg from '../components/common/CircleIconBg';
function Main() {
  return (
    <>
      <PrimaryHeader h="60px" p="0 15px">
        <Text fontSize="24px" flexGrow="1">
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
    </>
  );
}

export default Main;
