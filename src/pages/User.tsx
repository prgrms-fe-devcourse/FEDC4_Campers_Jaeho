import {
  Container,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ROUTES } from '../constants/routes';
import { IoArrowBackOutline } from 'react-icons/io5';
import { BiSearch } from 'react-icons/bi';
import { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import PrimaryLink from '../components/common/PrimaryLink';

const User = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Container padding="0">
      <VStack spacing={3} align="stretch">
        <Flex backgroundColor="#D3DCDE" height="14" borderRadius={3}>
          <PrimaryLink
            router={ROUTES.MAIN}
            color="#0D1321"
            width="5%"
            as="button"
            mr="1"
          >
            <IoArrowBackOutline fontSize={22} />
          </PrimaryLink>
          <PrimaryLink router={ROUTES.SEARCH_USER} width="92%" as="button">
            <InputGroup>
              <Input
                pr={2}
                type="text"
                placeholder="Search User"
                background="white"
              />
              <InputRightElement>
                <BiSearch fontSize={22} />
              </InputRightElement>
            </InputGroup>
          </PrimaryLink>
        </Flex>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList borderBottom={'none'} justifyContent={'center'}>
            <Tab color={'green.400'}>
              <Text color={tabIndex === 0 ? 'green.400' : 'blackAlpha.600'}>
                total
              </Text>
            </Tab>
            <Tab color={'green.400'}>
              <Text color={tabIndex === 1 ? 'green.400' : 'blackAlpha.600'}>
                follwer
              </Text>
            </Tab>
            <Tab color={'green.400'}>
              <Text color={tabIndex === 2 ? 'green.400' : 'blackAlpha.600'}>
                follwing
              </Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>total</TabPanel>
            <TabPanel>follwer</TabPanel>
            <TabPanel>follwing</TabPanel>
          </TabPanels>
        </Tabs>
        <NavigationBar />
      </VStack>
    </Container>
  );
};

export default User;
