import { Container } from '@chakra-ui/react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import PrimaryTabsSet from '../components/common/PrimaryTabsSet';
import useAuthCheck from '../hooks/useAuthCheck';

const Auth = () => {
  useAuthCheck();

  return (
    <Container
      h="100vh"
      centerContent
      maxW="container.sm"
      justifyContent="center"
    >
      <PrimaryTabsSet
        tabTexts={['로그인', '회원가입']}
        tabPanelChildrens={[<SignIn />, <SignUp />]}
        tabsMinH={550}
      />
    </Container>
  );
};

export default Auth;
