import { useNavigate } from 'react-router-dom';
import { useSearchAll } from '../hooks/query/useSearchAll';
import { PostResponse } from '../types/post';
import { useParams } from 'react-router-dom';
import SearchBar from '../components/Search/SearchBar';
import UserCard from '../components/Search/UserCard';
import NoResult from '../components/common/NoResult';
import Loading from '../components/common/Loading';
import AbsoluteCenterBox from '../components/common/AbsoluteCenterBox';
import PrimaryGrid from '../components/common/PrimaryGrid';
import PostCard from '../components/PostCard';
import { User } from '../types/user';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Box,
} from '@chakra-ui/react';
import PrimaryContainer from '../components/common/PrimaryContainer';
import UserList from './UserList';
import NavigationBar from '../components/NavigationBar';
const Search = () => {
  const navigate = useNavigate();
  const { keyword } = useParams<{ keyword: string }>();
  const { data, isLoading, isError } = useSearchAll(keyword);

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
    <>
      <PrimaryContainer>
        <SearchBar />
        {keyword ? (
          isLoading ? (
            <AbsoluteCenterBox>
              <Loading />
            </AbsoluteCenterBox>
          ) : (
            <Box p="10px">
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
                    <Stack>
                      {postResult && postResult.length !== 0 ? (
                        <PrimaryGrid>
                          {postResult.map((post) => (
                            <PostCard post={post} key={post._id} />
                          ))}
                        </PrimaryGrid>
                      ) : (
                        <NoResult />
                      )}
                    </Stack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          )
        ) : (
          <UserList />
        )}
        <NavigationBar />
      </PrimaryContainer>
    </>
  );
};

export default Search;
