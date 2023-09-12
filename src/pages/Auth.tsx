import { useState } from 'react';
import {
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Container,
} from '@chakra-ui/react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Auth = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Container
      h={'100vh'}
      centerContent
      maxW={'container.sm'}
      justifyContent={'center'}
    >
      <Tabs minH={500} index={tabIndex} onChange={handleTabsChange}>
        <TabList borderBottom={'none'} justifyContent={'center'}>
          <Tab color={'green.400'}>
            <Text color={tabIndex === 0 ? 'green.400' : 'blackAlpha.600'}>
              로그인
            </Text>
          </Tab>
          <Tab color={'green.400'}>
            <Text color={tabIndex === 1 ? 'green.400' : 'blackAlpha.600'}>
              회원가입
            </Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignIn />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Auth;
