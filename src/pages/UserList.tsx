import { Center, Stack, Text } from '@chakra-ui/react';
import { useFilter } from '../hooks/useFilter';
import UserCard from '../components/Search/UserCard';

const UserList = () => {
  const { filteredData } = useFilter();

  return (
    <>
      <Center alignItems="center" my="20px">
        <Text fontSize="20px" fontWeight="bold">
          전체 유저
        </Text>
      </Center>
      <Stack>
        {filteredData && (
          <>
            {filteredData.map((userData) => (
              <UserCard userData={userData} key={userData._id} />
            ))}
          </>
        )}
      </Stack>
    </>
  );
};

export default UserList;
