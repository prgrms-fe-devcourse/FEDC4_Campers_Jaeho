import { Flex, Center } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import { ROUTES } from '../constants/routes';
import PrimaryAvatar from './common/PrimaryAvatar';
import PrimaryLink from './common/PrimaryLink';
import { useUserInfoContext } from '../contexts/UserInfoProvider';

const NavigationBar = () => {
  const { userInfo } = useUserInfoContext();

  return (
    <Flex
      w="100%"
      h="50px"
      cursor="pointer"
      bgColor="gray.100"
      align="center"
      justify="center"
      pos="fixed"
      bottom={0}
      maxW="60ch"
    >
      {userInfo ? (
        <>
          <PrimaryLink
            router={ROUTES.MAIN}
            flex={1}
            h="100%"
            transition="all 0.3s"
            _hover={{ bgColor: 'gray.200' }}
          >
            <Center h="100%">
              <AiFillHome fontSize={22} />
            </Center>
          </PrimaryLink>
          <PrimaryLink
            router={ROUTES.CREATE_POST}
            flex={1}
            h="100%"
            transition="all 0.3s"
            _hover={{ bgColor: 'gray.200' }}
          >
            <Center h="100%">
              <IoIosAddCircle fontSize={22} />
            </Center>
          </PrimaryLink>
          <PrimaryLink
            flex={1}
            color="#0D1321"
            router={`${ROUTES.USER_INFO(userInfo?._id || '')}`}
            h="100%"
            transition="all 0.3s"
            _hover={{ bgColor: 'gray.200' }}
          >
            <Center h="100%">
              <PrimaryAvatar
                size="sm"
                src={userInfo.image ?? 'https://bit.ly/dan-abramov'}
                isOnline={true}
              />
            </Center>
          </PrimaryLink>
        </>
      ) : (
        <PrimaryLink
          w="100%"
          h="100%"
          bgColor="#28B67E"
          color="white"
          fontWeight="bold"
          router={ROUTES.AUTH}
        >
          <Center w="100%" h="100%">
            로그인!
          </Center>
        </PrimaryLink>
      )}
    </Flex>
  );
};

export default NavigationBar;
