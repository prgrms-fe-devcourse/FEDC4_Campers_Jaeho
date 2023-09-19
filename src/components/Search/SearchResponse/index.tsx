import { getSearchResult } from '../../../apis/search';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import PostCard from './PostCard';
import UserCard from './UserCard';
import { Container, Text } from '@chakra-ui/react';
import { PostResponse, UserResponse } from '../../../apis/types';
import SearchBar from '../SearchBar';
import NoResult from './NoResult';

const SearchAll = () => {
  const navigate = useNavigate();
  const { keyword } = useParams<{ keyword: string }>();
  const { data, isError, isLoading } = useQuery(['search-user', keyword], () =>
    getSearchResult(keyword!)
  );

  isError && navigate('/not-found');

  const isUserResponse = (
    data: UserResponse | PostResponse
  ): data is UserResponse => {
    return 'fullName' in data;
  };

  const isPostResponse = (
    data: UserResponse | PostResponse
  ): data is PostResponse => {
    return 'title' in data;
  };

  const userResult = data?.filter(isUserResponse);
  const postResult = data?.filter(isPostResponse);

  return (
    <Container textAlign="center" my={5}>
      <SearchBar />
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <>
          <Text fontSize="3xl" as="b">
            "{keyword}" 검색 결과 {data?.length}개
          </Text>
          <Text fontSize="2xl">Users</Text>
          {userResult?.length !== 0 ? (
            userResult?.map((res) => <UserCard key={res._id} userData={res} />)
          ) : (
            <NoResult />
          )}
          <Text fontSize="2xl">Posts</Text>
          {postResult?.length !== 0 ? (
            postResult?.map((res) => <PostCard key={res._id} postData={res} />)
          ) : (
            <NoResult />
          )}
        </>
      )}
    </Container>
  );
};

export default SearchAll;
