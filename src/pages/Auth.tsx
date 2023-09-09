import {
  Container,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

const Auth = () => {
  return (
    <Container>
      <Tabs colorScheme="green" align="center">
        <TabList>
          <Tab>로그인</Tab>
          <Tab>회원가입</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>로그인</TabPanel>
          <TabPanel>회원가입</TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Auth;
