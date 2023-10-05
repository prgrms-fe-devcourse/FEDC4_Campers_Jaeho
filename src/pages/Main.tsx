import { Stack, Center, Box, Image, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { ROUTES } from '../constants/routes';
import { SearchIcon } from '@chakra-ui/icons';
import ContentEmpty from '../assets/images/content_empty.png';
import NavigationBar from '../components/NavigationBar';
import PrimaryHeader from '../components/common/PrimaryHeader';
import PrimaryLink from '../components/common/PrimaryLink';
import CircleIconBg from '../components/common/CircleIconBg';
import PostCard from '../components/PostCard';
import PrimaryGrid from '../components/common/PrimaryGrid';
import useMainPageRender from '../hooks/query/useMainPageRender';
import useObserver from '../hooks/useObserver';
import PrimaryContainer from '../components/common/PrimaryContainer';
import Weather from '../components/Weather';
import DarkMode from '../components/common/DarkMode';
import Logo from '../assets/images/Campers.png';
import Loading from '../components/common/Loading';
import PrimaryImage from '../components/common/PrimaryImage';

const Main = () => {
  const { VITE_MAIN_CHANNELID } = import.meta.env;
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useMainPageRender(VITE_MAIN_CHANNELID);
  const { ref, inView } = useObserver();

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [data, inView]);

  return (
    <PrimaryContainer pb="70px">
      <PrimaryHeader isShowBackBtn={false}>
        <Image w="140px" src={Logo} />
        <Box flex={1} />
        <DarkMode />
        <PrimaryLink router={ROUTES.SEARCH}>
          <CircleIconBg>
            <SearchIcon />
          </CircleIconBg>
        </PrimaryLink>
      </PrimaryHeader>
      <Stack p="10px" mb="10px">
        {data && <Weather />}
        {data &&
          data.pages.map((page, index) => (
            <Box key={index}>
              <PrimaryGrid>
                {page?.map((post) => <PostCard post={post} key={post._id} />)}
              </PrimaryGrid>
            </Box>
          ))}
        <Box ref={ref as React.MutableRefObject<HTMLDivElement>} />
        {isFetchingNextPage && (
          <Center w="100%">
            <Loading />
          </Center>
        )}
        {hasNextPage === false && (
          <Flex
            align="center"
            w="100%"
            justify="space-between"
            p="30px"
            bgColor="blue.800"
            borderRadius="20px"
          >
            <Stack color="white">
              <Text as="b" fontSize="2xl">
                더이상 게시물이 없어요
              </Text>
              <Text fontSize="md" color="gray.400">
                이곳은 심해..
              </Text>
            </Stack>
            <PrimaryImage boxSize="120" imageSrc={ContentEmpty} />
          </Flex>
        )}
      </Stack>
      <NavigationBar />
    </PrimaryContainer>
  );
};

export default Main;
