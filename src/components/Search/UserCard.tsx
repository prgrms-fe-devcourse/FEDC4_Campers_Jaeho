import { User } from '../../types/user';
import PrimaryAvatar from '../common/PrimaryAvatar';
import { Card, CardBody, Flex } from '@chakra-ui/react';
import PrimaryInfo from '../common/PrimaryInfo';
import PrimaryLink from '../common/PrimaryLink';
import { ROUTES } from '../../constants/routes';

const UserCard = ({ userData }: { userData: User }) => {
  const { image, _id, isOnline, fullName, email } = userData;

  return (
    <Card transition="all 0.3s" _hover={{ bgColor: '#D3DCDE' }}>
      <PrimaryLink router={ROUTES.USER_INFO(_id)}>
        <CardBody>
          <Flex gap={4} align="center">
            <PrimaryAvatar src={image} userId={_id} isOnline={isOnline!} />
            <PrimaryInfo
              flex={1}
              title={fullName}
              subTitle={email}
              textAlign="start"
            />
          </Flex>
        </CardBody>
      </PrimaryLink>
    </Card>
  );
};

export default UserCard;
