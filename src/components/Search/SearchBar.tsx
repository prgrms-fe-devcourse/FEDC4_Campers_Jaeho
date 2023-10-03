import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useSearch } from '../../hooks/useSearch';

const SearchBar = () => {
  const { keyword, handleChange, handleSubmit } = useSearch();

  return (
    <Box p="10px">
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input placeholder="유저 또는 게시물 검색!" onChange={handleChange} />
          <InputRightElement>
            <IconButton
              type="submit"
              value={keyword}
              aria-label="Search database"
              icon={<Search2Icon />}
            />
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchBar;
