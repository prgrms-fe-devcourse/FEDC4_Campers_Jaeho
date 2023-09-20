import { Stack, Text } from '@chakra-ui/react';

const UserInfoItem = ({ title = '', subTitle = '', spacing = 0 }) => {
  return (
    <Stack textAlign="center" spacing={spacing}>
      <Text as="b" fontSize="lg">
        {title}
      </Text>
      <Text color="blackAlpha.600" fontSize="12px">
        {subTitle}
      </Text>
    </Stack>
  );
};

export default UserInfoItem;
