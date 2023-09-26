import { SearchIcon } from '@chakra-ui/icons';
import NavigationBar from '../components/NavigationBar';
import { ROUTES } from '../constants/routes';
import PrimaryHeader from '../components/common/PrimaryHeader';
import PrimaryLink from '../components/common/PrimaryLink';
import CircleIconBg from '../components/common/CircleIconBg';
import PostCard from '../components/PostCard';
import PrimaryGrid from '../components/common/PrimaryGrid';
import { Spinner, Text, Stack, Center, Box } from '@chakra-ui/react';
import useMainPageRender from '../hooks/query/useMainPageRender';
import useObserver from '../hooks/useObserver';
import PrimaryContainer from '../components/common/PrimaryContainer';

const Main = () => {
  const { VITE_MAIN_CHANNELID } = import.meta.env;
  const { data, hasNextPage, fetchNextPage } =
    useMainPageRender(VITE_MAIN_CHANNELID);
  const observeRef = useObserver(() => {
    fetchNextPage();
  });

  return (
    <PrimaryContainer>
      <PrimaryHeader>
        <Text fontSize="24px" flexGrow={1}>
          Campers
        </Text>
        <PrimaryLink router={ROUTES.SEARCH}>
          <CircleIconBg>
            <SearchIcon boxSize={5} />
          </CircleIconBg>
        </PrimaryLink>
      </PrimaryHeader>
      <Stack p="10px">
        {data &&
          data.pages.map((page, index) => (
            <Box key={index}>
              <PrimaryGrid>
                {page?.map((post) => <PostCard post={post} key={post._id} />)}
              </PrimaryGrid>
            </Box>
          ))}
      </Stack>
      <Stack p="15px">
        <Center w="100%" paddingBottom="60px">
          {!data || hasNextPage ? (
            <Spinner
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
