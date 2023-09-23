import {
  Container,
  List,
  Spacer,
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
import { useState } from 'react';
import { useFilter } from '../hooks/useFilter';
import { User } from '../types/user';
import NavigationBar from '../components/NavigationBar';
import PrimaryLink from '../components/common/PrimaryLink';
import PrimaryHeader from '../components/common/PrimaryHeader';
import PrimaryList from '../components/common/PrimaryList';
import PrimaryText from '../components/common/PrimaryText';

const UserList = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const [filteredData, switchData] = useFilter([]);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
    if (typeof switchData === 'function') {
      switchData(index);
    }
  };

  return (
    <Container padding={0}>
      <VStack spacing={3} align="stretch">
        <PrimaryHeader height={14} borderRadius={3}>
          <PrimaryLink
            router={ROUTES.MAIN}
            color="#0D1321"
            width="5%"
            as="button"
            mr={1}
          >
            <IoArrowBackOutline fontSize={22} />
          </PrimaryLink>
          <Spacer />
          <Text fontSize={20}>Chat</Text>
          <Spacer />
        </PrimaryHeader>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList borderBottom="none" justifyContent="center">
            <Tab color="green.400">
              <Text color={tabIndex === 0 ? 'green.400' : 'blackAlpha.600'}>
                total
              </Text>
            </Tab>
            <Tab color="green.400">
              <Text color={tabIndex === 1 ? 'green.400' : 'blackAlpha.600'}>
                follwer
              </Text>
            </Tab>
            <Tab color="green.400">
              <Text color={tabIndex === 2 ? 'green.400' : 'blackAlpha.600'}>
                follwing
              </Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {Array.isArray(filteredData) && (
                <List spacing={3}>
                  {filteredData.map(
                    ({ _id, fullName, isOnline, image }: Partial<User>) => (
                      <PrimaryList
                        src={image}
                        userId={_id!}
                        isOnline={isOnline!}
                        key={_id}
                      >
                        <PrimaryText>{fullName}</PrimaryText>
                      </PrimaryList>
                    )
                  )}
                </List>
              )}
            </TabPanel>
            <TabPanel>
              {Array.isArray(filteredData) && (
                <List spacing={3}>
                  {filteredData.map(
                    ({ _id, fullName, isOnline, image }: Partial<User>) => (
                      <PrimaryList
                        src={image}
                        userId={_id!}
                        isOnline={isOnline!}
                        key={_id}
                      >
                        <PrimaryText>{fullName}</PrimaryText>
                      </PrimaryList>
                    )
                  )}
                </List>
              )}
            </TabPanel>
            <TabPanel>
              {Array.isArray(filteredData) && (
                <List spacing={3}>
                  {filteredData.map(
                    ({ _id, fullName, isOnline, image }: Partial<User>) => (
                      <PrimaryList
                        src={image}
                        userId={_id!}
                        isOnline={isOnline!}
                        key={_id}
                      >
                        <PrimaryText>{fullName}</PrimaryText>
                      </PrimaryList>
                    )
                  )}
                </List>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        <NavigationBar />
      </VStack>
    </Container>
  );
};

export default UserList;
