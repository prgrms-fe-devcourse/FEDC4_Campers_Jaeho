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
import PrimaryContainer from '../components/common/PrimaryContainer';
import NavigationBar from '../components/NavigationBar';
import PrimaryTabsSet from '../components/common/PrimaryTabsSet';
import { User } from '../types/user';
import { Stack } from '@chakra-ui/react';
import { useFilter } from '../hooks/useFilter';

const Search = () => {
  const navigate = useNavigate();
  const { keyword } = useParams<{ keyword: string }>();
  const { data, isLoading, isError } = useSearchAll(keyword);
  const { filteredData } = useFilter();
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
      <PrimaryContainer pb="60px">
        <SearchBar />
        <Stack px="10px">
          {keyword ? (
            isLoading ? (
              <AbsoluteCenterBox>
                <Loading />
              </AbsoluteCenterBox>
            ) : (
              <PrimaryTabsSet
                tabTexts={[
                  `Users (${userResult && userResult.length})`,
                  `Posts (${postResult && postResult.length})`,
                ]}
                tabPanelChildrens={[
                  <>
                    {userResult?.length !== 0 ? (
                      userResult?.map((res) => (
                        <UserCard key={res._id} userData={res} />
                      ))
                    ) : (
                      <NoResult />
                    )}
                  </>,
                  <>
                    {postResult && postResult?.length !== 0 ? (
                      <PrimaryGrid>
                        {postResult.map((post) => (
                          <PostCard post={post} key={post._id} />
                        ))}
                      </PrimaryGrid>
                    ) : (
                      <NoResult />
                    )}
                  </>,
                ]}
                tabsIsFitted
              />
            )
          ) : (
            <>
              {filteredData && (
                <>
                  {filteredData.map((userData) => (
                    <UserCard userData={userData} key={userData._id} />
                  ))}
                </>
              )}
            </>
          )}
        </Stack>
        <NavigationBar />
      </PrimaryContainer>
    </>
  );
};

export default Search;
