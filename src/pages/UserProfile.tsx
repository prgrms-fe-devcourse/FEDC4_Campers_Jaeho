import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDisclosure } from '@chakra-ui/react';
import { getLocalStorage } from '../utils/storage';
import { searchUser } from '../apis/search';
import { FileImage } from '../apis/search';
import { getNotification } from '../apis/notification';
import PrimaryHeader from '../components/common/PrimaryHeader';
import UploadImage from '../components/common/UploadImage';
import UserInfoItem from '../components/common/UserInfoItem';
import PrimaryButton from '../components/common/PrimaryButton';
import GridList from '../components/common/GridList';
import PrimaryLink from '../components/common/PrimaryLink';
import { NotificationResponse } from '../types/user';
import { MdNotifications } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { AiFillEdit } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import {
  Container,
  Image,
  GridItem,
  Stack,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  Center,
} from '@chakra-ui/react';

const UserProfile = () => {
  const token = getLocalStorage('token');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notifications, setNotifications] = useState<
    NotificationResponse[] | [] | undefined
  >();
  const [userPostsData, setUserPostsData] = useState<FileImage[]>([]);
  const [userInfo, setUserInfo] = useState({
    email: '',
    fullName: '',
    totalFollowers: 0,
    totalFollowings: 0,
  });
  const { userId } = useParams();
  const navigate = useNavigate();
  const { data, error } = useQuery(['user', 'info', userId], () =>
    searchUser(userId!)
  );
  const newNotification = useQuery(['newNotification', token], () =>
    getNotification(token)
  ).data;

  useEffect(() => {
    if (data) {
      const { email, fullName, followers, followings, posts } = data;
      setUserInfo({
        email,
        fullName,
        totalFollowers: followers ? followers.length : 0,
        totalFollowings: followings ? followings.length : 0,
      });

      Array.isArray(posts) &&
        setUserPostsData(
          posts.map((post) => ({
            _id: post._id,
            image: post.image,
          }))
        );
    }
    if (token) {
      setNotifications(newNotification);
    }
    error && navigate('/not-found');
  }, [data, error]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent margin="20px" overflow="hidden">
          <Box>
            {notifications && notifications.length !== 0 ? (
              notifications.map(({ message, _id }) => (
                <Flex
                  key={_id}
                  align="center"
                  p="10px"
                  transition="all 0.3s"
                  _hover={{ bgColor: '#D9D9D9' }}
                >
                  <BiMessageDetail />
                  <Box m="0 0 0 10px">{message}</Box>
                </Flex>
              ))
            ) : (
              <Center p="20px 0">아직 뭐가 없네요..</Center>
            )}
          </Box>
        </ModalContent>
      </Modal>
      <Container my={5}>
        <PrimaryHeader>
          <PrimaryLink router={-1}>
            <GrFormPrevious fontSize="25px" />
          </PrimaryLink>
          <Box flex="1"></Box>
          <Flex gap="10px" fontSize="25px">
            <MdNotifications onClick={onOpen} />
            <AiFillEdit />
          </Flex>
        </PrimaryHeader>
        <Stack spacing={4} align="center">
          <UploadImage borderRadius="full" />
          <UserInfoItem title={userInfo.fullName} subTitle={userInfo.email} />
          <Flex gap={10} textAlign="center">
            <UserInfoItem title={`${userPostsData.length}`} subTitle="게시물" />
            <UserInfoItem
              title={`${userInfo.totalFollowers}`}
              subTitle="팔로워"
            />
            <UserInfoItem
              title={`${userInfo.totalFollowings}`}
              subTitle="팔로잉"
            />
          </Flex>
          <Flex gap={3}>
            <PrimaryButton w="150px">메시지</PrimaryButton>
            <PrimaryButton w="150px">로그아웃</PrimaryButton>
          </Flex>
          <GridList>
            {userPostsData &&
              userPostsData.map((post) => (
                <GridItem key={post._id}>
                  <Image src={post.image} />
                </GridItem>
              ))}
          </GridList>
        </Stack>
      </Container>
    </>
  );
};

export default UserProfile;
