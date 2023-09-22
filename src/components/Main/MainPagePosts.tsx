import { useState, useRef, useCallback } from 'react';
import useObserver from '../../hooks/useObserver';
import PostGridList from '../PostGridList';
import { Spinner, Text, useBoolean, Stack, Center } from '@chakra-ui/react';
import { searchPosterAll } from '../../apis/search';
export type MainPost = {
  title: string;
  updatedAt: string;
  _id: string;
  likes: number;
  image?: string;
};

function MainPagePosts() {
  const [AllPosts, setAllPosts] = useState<MainPost[][] | []>([]);
  const [isPostsEmpty, setIsPostsEmpty] = useBoolean();
  const postsGetCount = useRef(0);
  const { VITE_CHANNEL_ID } = import.meta.env;
  const observeRef = useObserver(() => {
    getMorePosts();
  });

  const getMorePosts = useCallback(async (limit = 12) => {
    if (isPostsEmpty) return;
    const nextPosts = await searchPosterAll(
      VITE_CHANNEL_ID,
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
    <>
      <Stack p="15px">
        {AllPosts.map((posts, index) => (
          <PostGridList posts={posts} minH="34vh" key={index} />
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
    </>
  );
}
export default MainPagePosts;
