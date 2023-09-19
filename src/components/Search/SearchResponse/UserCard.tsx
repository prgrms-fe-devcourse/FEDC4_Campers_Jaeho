import { UserResponse } from '../../../apis/types';
import PrimaryAvatar from '../../common/PrimaryAvatar';
import { Card, CardHeader, Flex } from '@chakra-ui/react';
import UserInfoItem from '../../common/UserInfoItem';
const UserCard = ({ userData }: { userData: UserResponse }) => {
  const { image, _id, isOnline, fullName, email } = userData;
  return (
    <Card>
      <CardHeader>
        <Flex>
          <Flex flex={1} gap={4} align="center" flexWrap="wrap">
            <PrimaryAvatar src={image} userId={_id} isOnline={isOnline} />
            <UserInfoItem title={fullName} subTitle={email} />
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
  );
};

export default UserCard;
