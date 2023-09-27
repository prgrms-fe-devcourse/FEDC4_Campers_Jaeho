import { Spinner, Text, Stack, Center, Box, Image } from '@chakra-ui/react';
import { ROUTES } from '../constants/routes';
import { SearchIcon } from '@chakra-ui/icons';
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

const Main = () => {
  const { VITE_MAIN_CHANNELID } = import.meta.env;
  const { data, hasNextPage, fetchNextPage } =
    useMainPageRender(VITE_MAIN_CHANNELID);
  const observeRef = useObserver(() => {
    fetchNextPage();
  });

  return (
    <PrimaryContainer>
      <PrimaryHeader isShowBackBtn={false}>
        <Box flexGrow={1}>
          <Image w="100px" h="40px" src={Logo} />
        </Box>
        <DarkMode />
        <PrimaryLink router={ROUTES.SEARCH}>
          <CircleIconBg>
            <SearchIcon boxSize={5} />
          </CircleIconBg>
        </PrimaryLink>
      </PrimaryHeader>
      <Weather />
      <Stack p="10px">
        {data &&
          data.pages.map((page, index) => (
            <Box key={index}>
              <PrimaryGrid>
                {page?.map((post) => (
                  <PostCard post={post} key={post._id} minH="25vh" />
                ))}
              </PrimaryGrid>
            </Box>
          ))}
      </Stack>
      <Stack p="15px">
        <Center w="100%" pb="60px">
          {!data || hasNextPage ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              ref={observeRef as React.MutableRefObject<HTMLDivElement>}
            />
          ) : (
            <Text fontSize="xl" fontWeight="bold">
              더 이상 게시물이 없습니다
            </Text>
          )}
        </Center>
      </Stack>
      <NavigationBar />
    </PrimaryContainer>
  );
};

export default Main;
