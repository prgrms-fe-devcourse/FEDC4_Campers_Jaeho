import PrimaryAvatar from '../common/PrimaryAvatar';
import { Card, Flex } from '@chakra-ui/react';
import PrimaryInfo from '../common/PrimaryInfo';
import PrimaryLink from '../common/PrimaryLink';
import { ROUTES } from '../../constants/routes';

export type UserCardProps = {
  _id: string;
  isOnline?: boolean;
  fullName?: string;
  email?: string;
  image?: string;
};

const UserCard = ({ userData }: { userData: UserCardProps }) => {
  const { image, _id, isOnline, fullName, email } = userData;

  return (
    <Card
      transition="all 0.3s"
      cursor="pointer"
      _hover={{ bgColor: 'gray.100' }}
    >
      <PrimaryLink router={ROUTES.USER_INFO(_id)} p="20px">
        <Flex gap={4} align="center">
          <PrimaryAvatar src={image} isOnline={isOnline!} />
          <PrimaryInfo
            flex={1}
            title={fullName}
            subTitle={email}
            textAlign="start"
            maxW="80%"
          />
        </Flex>
      </PrimaryLink>
    </Card>
  );
};

export default UserCard;
