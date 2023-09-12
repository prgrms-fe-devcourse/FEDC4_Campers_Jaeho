import MainPageContent from '../components/MainPageContent';
import BottomNavBar from '../components/BottomNavbar';
import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';

function Main() {
  return (
    <>
      <Flex height="60px" padding="0 15px" alignItems="center">
        <Text fontSize="24px" flexGrow="1">
          Campers
        </Text>
        {/* 검색페이지로 라우트 */}
        <SearchIcon
          boxSize={8}
          cursor="pointer"
          padding="5px"
          borderRadius="15px"
        />
      </Flex>

      <MainPageContent />

      <BottomNavBar />
    </>
  );
}

export default Main;
