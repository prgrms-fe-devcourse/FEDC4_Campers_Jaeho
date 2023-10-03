import { Flex, Center } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import { ROUTES } from '../constants/routes';
import PrimaryAvatar from './common/PrimaryAvatar';
import PrimaryLink from './common/PrimaryLink';
import { useUserInfoContext } from '../contexts/UserInfoProvider';
import PrimaryButton from './common/PrimaryButton';

const NavigationBar = () => {
  const { userInfo } = useUserInfoContext();
  const navMenu = [
    {
      icon: <AiFillHome />,
      link: ROUTES.MAIN,
    },
    {
      icon: <IoIosAddCircle />,
      link: ROUTES.CREATE_POST,
    },
    {
      icon: (
        <PrimaryAvatar
          size="sm"
          src={userInfo?.image ?? 'https://bit.ly/dan-abramov'}
          isOnline={true}
        />
      ),
      link: `${ROUTES.USER_INFO(userInfo?._id || '')}`,
    },
  ];

  return (
    <>
      {userInfo ? (
        <Flex
          w="100%"
          h="60px"
          maxW="60ch"
          pos="fixed"
          bottom="0"
          bgColor="#E6E9F2"
          borderRadius="15px 15px 0 0 "
          boxShadow="md"
          overflow="hidden"
        >
          <Flex w="100%" fontSize="28px" color="black">
            {navMenu &&
              navMenu.map(({ icon, link }) => (
                <PrimaryLink
                  router={link}
                  flex={1}
                  transition="all 0.3s"
                  _hover={{ bgColor: '#D6DBEA' }}
                  key={link}
                >
                  <Center h="100%">{icon}</Center>
                </PrimaryLink>
              ))}
          </Flex>
        </Flex>
      ) : (
        <Flex w="100%" maxW="60ch" pos="fixed" justify="center" bottom="0">
          <PrimaryLink router={ROUTES.AUTH} w="95%">
            <PrimaryButton w="100%">로그인!</PrimaryButton>
          </PrimaryLink>
        </Flex>
      )}
    </>
  );
};

export default NavigationBar;
