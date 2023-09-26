import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import PrimaryTabsSet from '../components/common/PrimaryTabsSet';
import PrimaryHeader from '../components/common/PrimaryHeader';
import PrimaryLink from '../components/common/PrimaryLink';
import useAuthCheck from '../hooks/useAuthCheck';
import { GrFormPrevious } from 'react-icons/gr';
import PrimaryContainer from '../components/common/PrimaryContainer';
import AbsoluteCenterBox from '../components/common/AbsoluteCenterBox';
const Auth = () => {
  useAuthCheck();

  return (
    <PrimaryContainer>
      <PrimaryHeader>
        <PrimaryLink cursor="pointer" router={-1}>
          <GrFormPrevious fontSize="25px" />
        </PrimaryLink>
      </PrimaryHeader>
      <AbsoluteCenterBox>
        <PrimaryTabsSet
          tabTexts={['로그인', '회원가입']}
          tabPanelChildrens={[<SignIn />, <SignUp />]}
        />
      </AbsoluteCenterBox>
    </PrimaryContainer>
  );
};

export default Auth;
