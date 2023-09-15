import MainPageContent from '../components/MainPageContent';
import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import NavigationBar from '../components/NavigationBar';

function Main() {
  return (
    <>
      <Flex h="60px" p="0 15px" align="center">
        <Text fontSize="24px" flexGrow="1">
          Campers
        </Text>
        {/* 검색페이지로 라우트 */}
        <SearchIcon boxSize={8} cursor="pointer" p="5px" borderRadius="15px" />
      </Flex>

      <MainPageContent />
      <NavigationBar />
    </>
  );
}

export default Main;
