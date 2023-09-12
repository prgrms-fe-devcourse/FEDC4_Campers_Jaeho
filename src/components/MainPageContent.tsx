import ContentList from './ContentList';
import { Spinner, Box, Text, Flex } from '@chakra-ui/react';
import useObserver from '../hooks/useObserver';
import { useState, useRef, useCallback } from 'react';
import axios from 'axios';

type contents = [] | { title: string; _id: string }[];

const axiosMainData = async (offset = 0, limit = 0) => {
  return await axios.get(
    // 정호님이 만드신 요청으로 변경이 필요할 수 있습니다
    `https://kdt.frontend.4th.programmers.co.kr:5009/posts/channel/64f806ccb3b4d210bb7b4fcb?offset=${offset}&limit=${limit}`
  );
};

function MainPageContent() {
  const ObserveRef = useObserver(() => {
    addContent();
  });
  const [contents, setContents] = useState<contents>([]);
  const [noMoreContent, setNoMoreContent] = useState<boolean>(false);
  const contentAddCount = useRef<number>(0);

  const addContent = useCallback(async (limit = 6) => {
    if (noMoreContent) return;
    const { data } = await axiosMainData(
      contentAddCount.current * limit,
      limit
    );
    setContents((prevContents) => [...prevContents, ...data]);
    contentAddCount.current++;
    if (data.length !== limit) setNoMoreContent(true);
  }, []);

  return (
    <>
      <Flex
        flexDirection="column"
        position="relative"
        padding="15px 15px 50px 15px"
      >
        <ContentList contents={contents} />
        <div ref={ObserveRef as React.MutableRefObject<HTMLDivElement>}></div>
        <Box w="100%" p={'20px'} textAlign={'center'}>
          {noMoreContent ? (
            <Text fontSize="xl" fontWeight={'bold'}>
              더 이상 게시물이 없습니다
            </Text>
          ) : (
            <Spinner />
          )}
        </Box>
      </Flex>
    </>
  );
}
export default MainPageContent;
