import { Flex } from '@chakra-ui/react';
import UserInfoItem from '../../common/UserInfoItem';
const NoResult = () => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <UserInfoItem
        title="검색 결과가 없습니다..."
        subTitle="누구도 도달하지 못한 미지의 땅일지도 모르겠네요."
        spacing={4}
      />
    </Flex>
  );
};

export default NoResult;
