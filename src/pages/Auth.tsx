import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import PrimaryTabsSet from '../components/common/PrimaryTabsSet';
import PrimaryHeader from '../components/common/PrimaryHeader';
import useAuthCheck from '../hooks/useAuthCheck';
import PrimaryContainer from '../components/common/PrimaryContainer';

const Auth = () => {
  useAuthCheck();

  return (
    <PrimaryContainer>
      <PrimaryHeader mb={10} />
      <PrimaryTabsSet
        tabTexts={['로그인', '회원가입']}
        tabPanelChildrens={[<SignIn />, <SignUp />]}
      />
    </PrimaryContainer>
  );
};

export default Auth;
