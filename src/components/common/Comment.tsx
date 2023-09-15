import {
  Box,
  Text,
  WrapItem,
  Avatar,
  Flex,
  Spacer,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton,
  Button,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  AvatarBadge,
} from '@chakra-ui/react';

const Comment = ({
  id,
  comment,
  image,
  isOnline,
}: {
  id: string;
  comment: string;
  image: string;
  isOnline: boolean;
}) => {
  const handleDelete = () => {
    alert('deldete');
  };
  return (
    <Flex bg="#ECE9E9" maxW="100%" p="4px">
      <WrapItem w="70px">
        <Avatar name="Dan Abrahmov" src={`${image}`}>
          <AvatarBadge
            bg={isOnline ? 'green.500' : 'red.500'}
            boxSize="1em"
            borderColor="white"
          />
        </Avatar>
      </WrapItem>
      <Box>
        <Text fontSize="10px">ID: {id}</Text>
        <Text fontSize="20px">{comment}</Text>
      </Box>
      <Spacer />
      <Popover>
        <PopoverTrigger>
          <IconButton
            icon={
              <Image
                src="src/images/more.png"
                alt="Cat Image"
                w="10px"
                h="10px"
              />
            }
            bg="#ECE9E9"
            aria-label="Show more options"
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default Comment;
