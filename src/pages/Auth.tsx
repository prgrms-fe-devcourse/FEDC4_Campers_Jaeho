import { Container } from '@chakra-ui/react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import PrimaryTabsSet from '../components/common/PrimaryTabsSet';
import PrimaryHeader from '../components/common/PrimaryHeader';
import PrimaryLink from '../components/common/PrimaryLink';
import useAuthCheck from '../hooks/useAuthCheck';
import { GrFormPrevious } from 'react-icons/gr';

const Auth = () => {
  useAuthCheck();

  return (
    <Container
      h="100vh"
      centerContent
      maxW="container.sm"
      justifyContent="center"
    >
      <PrimaryHeader w="100%" maxW="container.sm" pos="fixed" top={0} p={6}>
        <PrimaryLink cursor="pointer" router={-1}>
          <GrFormPrevious fontSize="25px" />
        </PrimaryLink>
      </PrimaryHeader>
      <PrimaryTabsSet
        tabTexts={['로그인', '회원가입']}
        tabPanelChildrens={[<SignIn />, <SignUp />]}
        tabsMinH={550}
      />
    </Container>
  );
};

export default Auth;
