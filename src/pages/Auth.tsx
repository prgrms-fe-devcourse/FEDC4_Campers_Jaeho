import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import PrimaryTabsSet from '../components/common/PrimaryTabsSet';
import PrimaryHeader from '../components/common/PrimaryHeader';
import PrimaryLink from '../components/common/PrimaryLink';
import useAuthCheck from '../hooks/useAuthCheck';
import { GrFormPrevious } from 'react-icons/gr';
import PrimaryContainer from '../components/common/PrimaryContainer';
import CircleIconBg from '../components/common/CircleIconBg';

const Auth = () => {
  useAuthCheck();

  return (
    <PrimaryContainer>
      <PrimaryHeader mb={10}>
        <PrimaryLink cursor="pointer" router={-1}>
          <CircleIconBg>
            <GrFormPrevious fontSize="25px" />
          </CircleIconBg>
        </PrimaryLink>
      </PrimaryHeader>
      <PrimaryTabsSet
        tabTexts={['로그인', '회원가입']}
        tabPanelChildrens={[<SignIn />, <SignUp />]}
      />
    </PrimaryContainer>
  );
};

export default Auth;
