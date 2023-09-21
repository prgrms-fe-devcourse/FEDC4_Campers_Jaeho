import { useState, useRef, useCallback } from 'react';
import useObserver from '../../hooks/useObserver';
import { getMainPosts } from '../../apis/main';
import PostGridList from '../PostGridList';
import { PostResponse } from '../../types/post';
import { Spinner, Text, useBoolean, Stack, Center } from '@chakra-ui/react';

function MainPagePosts() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [isPostsEmpty, setIsPostsEmpty] = useBoolean();
  const postsGetCount = useRef(0);
  const observeRef = useObserver(() => {
    getMorePosts();
  });
  const getMorePosts = useCallback(async (limit = 9) => {
    if (isPostsEmpty) return;
    const nextPosts = await getMainPosts(postsGetCount.current * limit, limit);
    setPosts((prevPosts) => [...prevPosts, ...nextPosts]);
    postsGetCount.current++;
    if (nextPosts.length !== limit) setIsPostsEmpty.on();
  }, []);

  return (
    <>
      <Stack p="15px">
        <PostGridList posts={posts} />
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
