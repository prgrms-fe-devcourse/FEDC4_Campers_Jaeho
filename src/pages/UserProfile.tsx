import { Container, Flex, Stack, Button, Center, Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, MouseEventHandler } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PrimaryHeader from '../components/common/PrimaryHeader';
import UploadImage from '../components/common/UploadImage';
import PrimaryInfo from '../components/common/PrimaryInfo';
import PrimaryButton from '../components/common/PrimaryButton';
import PrimaryLink from '../components/common/PrimaryLink';
import PrimaryGrid from '../components/common/PrimaryGrid';
import TemperatureBar from '../components/common/TemperatureBar';
import PostCard from '../components/PostCard';
import { useDisclosure } from '@chakra-ui/react';
import { MdNotifications } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { AiFillEdit } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import PrimaryModal from '../components/common/PrimaryModal';
import { NotificationResponse } from '../types/user';
// import { useNotification } from '../hooks/query/useNotification';
import { getNotification } from '../apis/Notification';
import { useSearchUser } from '../hooks/query/useSearchUser';
type FileImage = {
  _id: string;
  image?: string;
};

const UserProfile = () => {
  const [userPostsData, setUserPostsData] = useState<FileImage[]>([]);
  const [userImage, setUserImage] = useState<File | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notifications, setNotifications] = useState<
    NotificationResponse[] | [] | undefined
  >();
  const { userId } = useParams();
  // const { data, error } = useQuery(['user', 'info', userId], () =>
  //   searchUser(userId!)
  // );
  const {
    getSearchUser: { data, error },
  } = useSearchUser(userId);
  // const { data: notiData } = useNotification();
  const newNotification = useQuery(['newNotification'], () =>
    getNotification()
  ).data;

  const [userInfo, setUserInfo] = useState({
    email: '',
    fullName: '',
    totalFollowers: 0,
    totalFollowings: 0,
  });

  const navigate = useNavigate();

  const handleSubmit: MouseEventHandler<HTMLButtonElement | null> = () => {
    const newForm = new FormData();
    newForm.append('isCover', 'false');
    if (userImage) {
      newForm.append('image', userImage);
    }
  };

  const handleChange = (file: File) => {
    setUserImage(file);
  };

  useEffect(() => {
    if (data) {
      const { email, fullName, followers, following, posts } = data;
      setUserInfo({
        email,
        fullName,
        totalFollowers: followers ? followers.length : 0,
        totalFollowings: following ? following.length : 0,
      });

      if (Array.isArray(posts)) {
        setUserPostsData(
          posts.map(({ _id, image }) => ({
            _id,
            image,
          }))
        );
      }
    }

    setNotifications(newNotification);

    error && navigate('/not-found');
  }, [data, error]);

  return (
    <>
      <PrimaryModal isOpen={isOpen} onClose={onClose}>
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
      </PrimaryModal>
      <Container my={5}>
        <PrimaryHeader>
          <PrimaryLink router={-1}>
            <GrFormPrevious fontSize="25px" />
          </PrimaryLink>
          <Box flex={1}></Box>
          <Flex gap="10px" fontSize="25px">
            <MdNotifications onClick={onOpen} />
            <AiFillEdit />
          </Flex>
        </PrimaryHeader>
        <Stack spacing={4} align="center">
          <UploadImage borderRadius="full" handleOnChange={handleChange} />
          <PrimaryInfo title={userInfo.fullName} subTitle={userInfo.email} />
          <TemperatureBar value={60} maxW="70%" />
          <Flex gap={10} textAlign="center">
            <PrimaryInfo title={`${userPostsData.length}`} subTitle="게시물" />
            <PrimaryInfo
              title={`${userInfo.totalFollowers}`}
              subTitle="팔로워"
            />
            <PrimaryInfo
              title={`${userInfo.totalFollowings}`}
              subTitle="팔로잉"
            />
          </Flex>
          <Flex gap={3}>
            <PrimaryButton w="150px">메시지</PrimaryButton>
            <PrimaryButton w="150px">로그아웃</PrimaryButton>
          </Flex>
          <PrimaryGrid spacing={0}>
            {userPostsData.map((post) => (
              <PostCard
                post={post}
                key={post._id}
                isShowText={false}
                borderRadius="none"
              />
            ))}
          </PrimaryGrid>
        </Stack>
        <Button onClick={handleSubmit}>변경 UI</Button>
      </Container>
      s
    </>
  );
};

export default UserProfile;
