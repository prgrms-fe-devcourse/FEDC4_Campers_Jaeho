import { Stack } from '@chakra-ui/react';
import { useFilter } from '../hooks/useFilter';
import UserCard from '../components/Search/UserCard';

const UserList = () => {
  const { filteredData } = useFilter();

  return (
    <Stack mt="20px">
      {filteredData && (
        <>
          {filteredData.map((userData) => (
            <UserCard userData={userData} key={userData._id} />
          ))}
        </>
      )}
    </Stack>
  );
};

export default UserList;
