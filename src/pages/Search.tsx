import { useNavigate } from 'react-router-dom';
import { useQueryPost } from '../hooks/useQueryPost';
import { PostResponse } from '../types/post';
import { useParams } from 'react-router-dom';
import PrimaryInfo from '../components/common/PrimaryInfo';
import SearchBar from '../components/Search/SearchBar';
import UserCard from '../components/Search/UserCard';
import NoResult from '../components/common/NoResult';
import Loading from '../components/common/Loading';
import AbsoluteCenterBox from '../components/common/AbsoluteCenterBox';
import PostGridList from '../components/PostGridList';
import searchImage from '../assets/images/search.png';
import { User } from '../types/user';
import {
  Container,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
} from '@chakra-ui/react';

const Search = () => {
  const navigate = useNavigate();
  const { keyword } = useParams<{ keyword: string }>();
  const {
    getAllBoth: { data, isLoading, isError },
  } = useQueryPost(keyword);

  const userResult = data?.filter((item): item is User => 'fullName' in item);
  const postResult = data
    ?.filter((item): item is PostResponse => 'title' in item)
    .map(({ title, updatedAt, _id, likes, image }) => ({
      title,
      updatedAt,
      _id,
      likes: likes.length,
      image,
    }));

  isError && navigate('/search');

  return (
    <Container p={5} minH="100vh" pos="relative">
      <SearchBar />
      {keyword ? (
        isLoading ? (
          <AbsoluteCenterBox>
            <Loading />
          </AbsoluteCenterBox>
        ) : (
          <Tabs colorScheme="green">
            <TabList>
              <Tab flex={1}>Users ({userResult && userResult.length})</Tab>
              <Tab flex={1}>Posts ({postResult && postResult.length})</Tab>
            </TabList>
            <TabPanels p="10px 0">
              <TabPanel p={0}>
                <Stack>
                  {userResult?.length !== 0 ? (
                    userResult?.map((res) => (
                      <UserCard key={res._id} userData={res} />
                    ))
                  ) : (
                    <NoResult />
                  )}
                </Stack>
              </TabPanel>
              <TabPanel p={0}>
                {postResult && postResult.length !== 0 ? (
                  <PostGridList posts={postResult} minH="none" />
                ) : (
                  <NoResult />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )
      ) : (
        <AbsoluteCenterBox>
          <Image src={searchImage} w="70%" />
          <PrimaryInfo
            title="찾는 게 있으신가요?"
            subTitle="키워드를 검색해보세요"
          />
        </AbsoluteCenterBox>
      )}
    </Container>
  );
};

export default Search;
