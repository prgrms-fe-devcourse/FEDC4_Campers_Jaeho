import { Container, Image, Text } from '@chakra-ui/react';
import searchImage from '../assets/images/search.png';
import PrimaryInfo from '../components/common/PrimaryInfo';
import SearchBar from '../components/Search/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useQueryPost } from '../hooks/useQueryPost';
import { PostResponse } from '../types/post';
import { User } from '../types/user';
import { useParams } from 'react-router-dom';
import PrimaryLink from '../components/common/PrimaryLink';
import UserCard from '../components/Search/UserCard';
import PostCard from '../components/Search/PostCard';
import NoResult from '../components/common/NoResult';
import Loading from '../components/common/Loading';

const Search = () => {
  const navigate = useNavigate();
  const { keyword } = useParams<{ keyword: string }>();
  const {
    getAllBoth: { data, isLoading, isError },
  } = useQueryPost(keyword);

  const userResult = data?.filter((item): item is User => 'fullName' in item);
  const postResult = data?.filter(
    (item): item is PostResponse => 'title' in item
  );

  isError && navigate('/search');

  return (
    <Container mt={5} textAlign="center">
      <SearchBar />
      {keyword ? (
        isLoading ? (
          <Loading />
        ) : (
          <>
            <Text fontSize="3xl" as="b">
              "{keyword}" 검색 결과 {data?.length}개
            </Text>
            <Text fontSize="2xl">Users</Text>
            {userResult?.length !== 0 ? (
              userResult?.map((res) => (
                <UserCard key={res._id} userData={res} />
              ))
            ) : (
              <NoResult />
            )}
            <Text fontSize="2xl">Posts</Text>
            {postResult?.length !== 0 ? (
              postResult?.map((res) => (
                <PostCard key={res._id} postData={res} />
              ))
            ) : (
              <NoResult />
            )}
            {!userResult?.length && !postResult?.length && (
              <PrimaryLink router="/createpost">
                <Text colorScheme="green.400" as="b" cursor="pointer">
                  이 곳에 대한 첫 글 써보기
                </Text>
              </PrimaryLink>
            )}
          </>
        )
      ) : (
        <>
          <Image src={searchImage} />
          <PrimaryInfo
            title="찾는 게 있으신가요?"
            subTitle="키워드를 검색해보세요"
          />
        </>
      )}
    </Container>
  );
};

export default Search;
