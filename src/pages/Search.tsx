import { useNavigate } from 'react-router-dom';
import { useSearchAll } from '../hooks/query/useSearchAll';
import { PostResponse } from '../types/post';
import { useParams } from 'react-router-dom';
import PrimaryInfo from '../components/common/PrimaryInfo';
import SearchBar from '../components/Search/SearchBar';
import UserCard from '../components/Search/UserCard';
import NoResult from '../components/common/NoResult';
import Loading from '../components/common/Loading';
import AbsoluteCenterBox from '../components/common/AbsoluteCenterBox';
import PrimaryGrid from '../components/common/PrimaryGrid';
import PostCard from '../components/PostCard';
import searchImage from '../assets/images/search.png';
import { User } from '../types/user';
import { Image, Stack } from '@chakra-ui/react';
import PrimaryContainer from '../components/common/PrimaryContainer';
import NavigationBar from '../components/NavigationBar';
import PrimaryTabsSet from '../components/common/PrimaryTabsSet';

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
    <PrimaryContainer>
      <Stack p="10px">
        <SearchBar />
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
                <Stack>
                  {userResult?.length !== 0 ? (
                    userResult?.map((res) => (
                      <UserCard key={res._id} userData={res} />
                    ))
                  ) : (
                    <NoResult />
                  )}
                </Stack>,
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
                </Stack>,
              ]}
              tabsIsFitted
            />
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
      </Stack>
      <NavigationBar />
    </PrimaryContainer>
  );
};

export default Search;
