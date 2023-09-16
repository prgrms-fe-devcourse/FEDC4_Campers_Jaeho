import { Box, Text } from '@chakra-ui/react';

const UserInfoItem = ({ title = '', subTitle = '' }) => {
  return (
    <Box textAlign="center">
      <Text as="b" fontSize="lg">
        {title}
      </Text>
      <Text color="blackAlpha.600" fontSize="12px">
        {subTitle}
      </Text>
    </Box>
  );
};

export default UserInfoItem;
