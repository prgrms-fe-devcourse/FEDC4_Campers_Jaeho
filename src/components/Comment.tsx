import React from 'react';
import { Box, Image, Text, Stack, Container, Flex } from '@chakra-ui/react';

const Comment: React.FC<{
  data: { id: number; comment: string; image: string };
}> = ({ data }) => {
  const { id, comment, image } = data;
  return (
    <Container>
      <Flex p={4} w={568} justify="space-between">
        <Box display="flex" alignItems="center">
          <Image
            src={image}
            alt={`User ${id}`}
            boxSize="50px"
            objectFit="cover"
            borderRadius="full"
          />
          <Stack direction="column" p={4}>
            <Text>{id}</Text>
            <Text>{comment}</Text>
          </Stack>
        </Box>

        <Box>
          <Image
            src="src/images/more.png"
            alt={`User ${id}`}
            boxSize="20px"
            objectFit="cover"
            mt={4}
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default Comment;
