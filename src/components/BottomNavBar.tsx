import { Flex, Text, Center, Avatar, useBoolean } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

function BottomNavBar() {
  const [loginFlag] = useBoolean(true); // 임시로 (네브바 : 로그인 버튼) 중 뭐가 보일지 결정하는 상태입니다

  return (
    <>
      <Flex
        pos="fixed"
        w="100%"
        p="10px"
        color="white"
        textAlign="center"
        bottom="0"
        left="0"
        right="0"
        cursor="pointer"
        bgColor={loginFlag ? '#ECE9E9' : '#28B67E'}
        align="center"
        justify="center"
      >
        {loginFlag ? (
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
