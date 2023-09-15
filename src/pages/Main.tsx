import MainPageContent from '../components/Main/MainPageContent';
import { SearchIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

function Main() {
  return (
    <>
      <Flex h="60px" p="0 15px" align="center">
        <Text fontSize="24px" flexGrow="1">
          Campers
        </Text>
        <Link to={ROUTES.SEARCH}>
          <SearchIcon
            boxSize="8"
            cursor="pointer"
            p="5px"
            borderRadius="15px"
          />
        </Link>
      </Flex>

      <MainPageContent />
    </>
  );
}

export default Main;
