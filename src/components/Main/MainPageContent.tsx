import useObserver from '../../hooks/useObserver';
import axios from 'axios';
import ContentList from '../ContentList';
import { useState, useRef, useCallback } from 'react';
import { Spinner, Box, Text, Flex, useBoolean } from '@chakra-ui/react';

const axiosMainData = async (offset = 0, limit = 0) => {
  return await axios.get(
    // 정호님이 만드신 요청으로 변경이 필요할 수 있습니다
    `https://kdt.frontend.4th.programmers.co.kr:5009/posts/channel/64fbfdabe8468d1ed414e307?offset=${offset}&limit=${limit}`
  );
};

export type Content = {
  title: string;
  _id: string;
  image?: string;
};

function MainPageContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [isContentEmpty, setIsContentEmpty] = useBoolean();
  const contentCount = useRef<number>(0);
  const observeRef = useObserver(() => {
    moreContent();
  });
  const moreContent = useCallback(async (limit = 9) => {
    if (isContentEmpty) return;
    const { data } = await axiosMainData(contentCount.current * limit, limit);
    console.log(data);
    setContents((prevContents) => [...prevContents, ...data]);
    contentCount.current++;
    if (data.length !== limit) setIsContentEmpty.on();
  }, []);

  return (
    <>
      <Flex flexDir="column" pos="relative" p="15px 15px 50px 15px">
        <ContentList contents={contents} />
        <div ref={observeRef as React.MutableRefObject<HTMLDivElement>}></div>
        <Box w="100%" p="20px" textAlign="center">
          {isContentEmpty ? (
            <Text fontSize="xl" fontWeight="bold">
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
