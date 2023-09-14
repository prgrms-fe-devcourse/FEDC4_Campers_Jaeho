import { Flex } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoIosAddCircle } from 'react-icons/io';
import { HiPaperAirplane } from 'react-icons/hi2';
import { ROUTES } from '../constants/routes';
import { getLocalStorage } from '../utils/storage';
import AvatarImage from './common/AvatarImage';
import PrimaryLink from './common/PrimaryLink';

const NavigationBar = () => {
  // context를 뭘 사용해야할지 고민
  // user정보를 context로 하면 로그인 되어있는지 id를 받을수 있음
  const isUser = getLocalStorage('token', '');

  return (
    <>
      <Flex
        pos="fixed"
        w="100%"
        p="10px"
        textAlign="center"
        bottom="0"
        left="0"
        right="0"
        cursor="pointer"
        bgColor={isUser ? '#ECE9E9' : '#28B67E'}
        align="center"
        justify="center"
      >
        {isUser ? (
          <>
            <PrimaryLink color="#0D1321" router={ROUTES.MAIN}>
              <AiFillHome />
            </PrimaryLink>
            <PrimaryLink color="#0D1321" router={ROUTES.USER_LIST}>
              <FaPeopleGroup />
            </PrimaryLink>
            <PrimaryLink color="#0D1321" router={ROUTES.CREATE_POST}>
              <IoIosAddCircle />
            </PrimaryLink>
            <PrimaryLink color="#0D1321" router={ROUTES.CHAT_LIST}>
              <HiPaperAirplane />
            </PrimaryLink>
            <PrimaryLink
              color="#0D1321"
              router={ROUTES.USER_EDIT.replace(':id', `${isUser}`)}
            >
              <AvatarImage
                size="sm"
                src="https://bit.ly/dan-abramov"
                userId="1234"
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
    </>
  );
};

export default NavigationBar;
