import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { getLocalStorage } from '../utils/storage';

const Auth = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    const token = getLocalStorage('token');

    if (token.length) {
      history.replaceState(null, '', '/');
      navigate('/');
    }
  }, []);

  return (
    <Container
      h="100vh"
      centerContent
      maxW="container.sm"
      justifyContent="center"
    >
      <Tabs minH={500} index={tabIndex} onChange={handleTabsChange}>
        <TabList borderBottom="none" justifyContent="center">
          <Tab color="green.400">
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
