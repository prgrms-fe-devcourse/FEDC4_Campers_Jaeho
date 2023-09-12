import { Flex, Text, Center, Avatar } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

function BottomNavBar() {
  const [isLogin] = useState(0); // 임시로 로그인 버튼이 보일지 네브바가 보일지 결정하는 상태입니다

  const bottomFixedEl = {
    width: '100%',
    padding: '10px',
    textAlign: 'center' as const,
    position: 'fixed' as const,
    color: 'white',
    bottom: '0',
    left: '0',
    right: '0',
    cursor: 'pointer',
  };

  return (
    <>
      <Flex
        style={bottomFixedEl}
        backgroundColor={isLogin ? '#ECE9E9' : '#28B67E'}
        alignItems="center"
        justifyContent="center"
      >
        {isLogin ? (
          <>
            <Center flex="1">
              <Text color="#0D1321">홈</Text>
            </Center>
            <Center flex="1">
              <Text color="#0D1321">유저목록</Text>
            </Center>
            <Center flex="1">
              <Text color="#0D1321">추가</Text>
            </Center>
            <Center flex="1">
              <Text color="#0D1321">채팅</Text>
            </Center>
            <Center flex="1">
              <Avatar
                size="sm"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              />
            </Center>
          </>
        ) : (
          <Link style={{ width: '100%', height: '100%' }} to={ROUTES.AUTH}>
            로그인!
          </Link>
        )}
      </Flex>
    </>
  );
}

export default BottomNavBar;
