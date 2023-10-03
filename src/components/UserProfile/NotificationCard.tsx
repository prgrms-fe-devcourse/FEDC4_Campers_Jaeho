import PrimaryLink from '../common/PrimaryLink';
import { Flex, Box, FlexProps } from '@chakra-ui/react';
import { BiMessageDetail } from 'react-icons/bi';
import { ROUTES } from '../../constants/routes';

type NotificationCardProps = FlexProps & {
  _id: string;
  fullName: string;
  router: string | undefined;
};

const NotificationCard = ({
  _id,
  fullName,
  router = '',
}: NotificationCardProps) => {
  return (
    <PrimaryLink router={ROUTES.POST_DETAIL(router)}>
      <Flex
        key={_id}
        align="center"
        p="15px"
        transition="all 0.3s"
        cursor="pointer"
        _hover={{ bgColor: 'rgba(122,122,122,0.3)' }}
      >
        <BiMessageDetail />
        <Box m="0 0 0 10px">"{fullName}" 님이 알람을 보냈습니다.</Box>
      </Flex>
    </PrimaryLink>
  );
};

export default NotificationCard;
