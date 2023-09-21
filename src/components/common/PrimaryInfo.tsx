import { Stack, Text } from '@chakra-ui/react';

const PrimaryInfo = ({
  title = '',
  subTitle = '',
  spacing = 0,
  titleSize = 'lg',
  subTitleSize = 'xs',
}) => {
  return (
    <Stack textAlign="center" spacing={spacing}>
      <Text as="b" fontSize={titleSize}>
        {title}
      </Text>
      <Text color="blackAlpha.600" fontSize={subTitleSize}>
        {subTitle}
      </Text>
    </Stack>
  );
};

export default PrimaryInfo;
