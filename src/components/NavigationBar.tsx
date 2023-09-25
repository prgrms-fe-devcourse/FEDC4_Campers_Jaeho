import { Flex } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoIosAddCircle } from 'react-icons/io';
import { HiPaperAirplane } from 'react-icons/hi2';
import { ROUTES } from '../constants/routes';
import PrimaryAvatar from './common/PrimaryAvatar';
import PrimaryLink from './common/PrimaryLink';
import { useUserInfoContext } from '../contexts/UserInfoProvider';

const NavigationBar = () => {
  const userInfo = useUserInfoContext();

  return (
    <Flex
      width="100%"
      h="50px"
      cursor="pointer"
      bgColor={userInfo ? '#ECE9E9' : '#28B67E'}
      align="center"
      justify="center"
      pos="fixed"
      w="100%"
      bottom={0}
      maxW="container.sm"
    >
      {userInfo ? (
        <>
          <PrimaryLink
            router={ROUTES.MAIN}
            flex={1}
            h="100%"
            transition="all 0.3s"
            _hover={{ bgColor: '#D3DCDE' }}
          >
            <AiFillHome fontSize={22} />
          </PrimaryLink>
          <PrimaryLink
            router={ROUTES.USER_LIST}
            flex={1}
            h="100%"
            transition="all 0.3s"
            _hover={{ bgColor: '#D3DCDE' }}
          >
            <FaPeopleGroup fontSize={22} />
          </PrimaryLink>
          <PrimaryLink
            router={ROUTES.CREATE_POST}
            flex={1}
            h="100%"
            transition="all 0.3s"
            _hover={{ bgColor: '#D3DCDE' }}
          >
            <IoIosAddCircle fontSize={22} />
          </PrimaryLink>
          <PrimaryLink
            router={ROUTES.CHAT_LIST}
            flex={1}
            h="100%"
            transition="all 0.3s"
            _hover={{ bgColor: '#D3DCDE' }}
          >
            <HiPaperAirplane fontSize={22} />
          </PrimaryLink>
          <PrimaryLink
            flex={1}
            color="#0D1321"
            router={`${ROUTES.USER_INFO(userInfo?._id || '')}`}
          >
            <PrimaryAvatar
              size="sm"
              src={userInfo.image ?? 'https://bit.ly/dan-abramov'}
              isOnline={true}
            />
          </PrimaryLink>
        </>
      ) : (
        <PrimaryLink color="#0D1321" router={ROUTES.AUTH}>
          로그인!
        </PrimaryLink>
      )}
    </Flex>
  );
};

export default NavigationBar;
