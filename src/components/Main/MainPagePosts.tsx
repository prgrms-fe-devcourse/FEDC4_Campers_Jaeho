import { useState, useRef, useCallback } from 'react';
import useObserver from '../../hooks/useObserver';
import PrimaryGrid from '../common/PrimaryGrid';
import {
  Spinner,
  Text,
  useBoolean,
  Stack,
  Center,
  Box,
} from '@chakra-ui/react';
import { searchPosterAll } from '../../apis/search';
import PostCard from '../PostCard';

export type MainPost = {
  title?: string;
  updatedAt?: string;
  _id: string;
  likes?: number;
  image?: string;
};

function MainPagePosts() {
  const [AllPosts, setAllPosts] = useState<MainPost[][] | []>([]);
  const [isPostsEmpty, setIsPostsEmpty] = useBoolean();
  const postsGetCount = useRef(0);
  const { VITE_MAIN_CHANNELID } = import.meta.env;
  const observeRef = useObserver(() => {
    getMorePosts();
  });

  const getMorePosts = useCallback(async (limit = 15) => {
    if (isPostsEmpty) return;
    const nextPosts = await searchPosterAll(
      VITE_MAIN_CHANNELID,
      postsGetCount.current * limit,
      limit
    );
    if (nextPosts) {
      setAllPosts((prevPosts) => [...prevPosts, nextPosts]);
      postsGetCount.current++;
      if (nextPosts.length !== limit) setIsPostsEmpty.on();
    }
  }, []);

  return (
    <Box maxW="container.sm" width="100%">
      <Stack>
        {AllPosts.map((posts, index) => (
          <PrimaryGrid key={index}>
            {posts.map((post) => (
              <PostCard post={post} key={post._id} />
            ))}
          </PrimaryGrid>
        ))}
        <Stack ref={observeRef as React.MutableRefObject<HTMLDivElement>} />
        <Center w="100%" paddingBottom="60px">
          {isPostsEmpty ? (
            <Text fontSize="xl" fontWeight="bold">
              더 이상 게시물이 없습니다
            </Text>
          ) : (
            <Spinner />
          )}
        </Center>
      </Stack>
    </Box>
  );
}

export default MainPagePosts;
