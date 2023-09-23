import { useState } from 'react';
import { Container, List, Spacer, Text, VStack } from '@chakra-ui/react';
import NavigationBar from '../components/NavigationBar';
import PrimaryLink from '../components/common/PrimaryLink';
import PrimaryHeader from '../components/common/PrimaryHeader';
import PrimaryList from '../components/common/PrimaryList';
import PrimaryText from '../components/common/PrimaryText';
import PrimaryTabsSet from '../components/common/PrimaryTabsSet';
import { IoArrowBackOutline } from 'react-icons/io5';
import { ROUTES } from '../constants/routes';
import { useFilter } from '../hooks/useFilter';
import { User } from '../types/user';

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
        <PrimaryTabsSet
          tabIndex={tabIndex}
          handleTabsChange={handleTabsChange}
          tabTexts={['total', 'follwer', 'following']}
          tabPanelChildrens={[
            Array.isArray(filteredData) && (
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
            ),
            Array.isArray(filteredData) && (
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
            ),
            Array.isArray(filteredData) && (
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
            ),
          ]}
        />
        <NavigationBar />
      </VStack>
    </Container>
  );
};

export default UserList;
