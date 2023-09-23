import { useState } from 'react';
import { Container } from '@chakra-ui/react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import PrimaryTabsSet from '../components/common/PrimaryTabsSet';
import useAuthCheck from '../hooks/useAuthCheck';

const Auth = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  useAuthCheck();

  return (
    <Container
      h="100vh"
      centerContent
      maxW="container.sm"
      justifyContent="center"
    >
      <PrimaryTabsSet
        tabIndex={tabIndex}
        handleTabsChange={handleTabsChange}
        tabTexts={['로그인', '회원가입']}
        tabPanelChildrens={[<SignIn />, <SignUp />]}
        tabsMinH={550}
      />
    </Container>
  );
};

export default Auth;
