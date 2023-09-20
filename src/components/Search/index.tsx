import { Image } from '@chakra-ui/react';
import searchImage from '../../assets/images/search.png';
import UserInfoItem from '../common/UserInfoItem';
import SearchBar from './SearchBar';

const SearchForm = () => {
  return (
    <>
      <SearchBar />
      <Image src={searchImage} />
      <UserInfoItem
        title="찾는게 있으신가요?"
        subTitle="키워드를 검색해보세요."
        spacing={3}
      />
    </>
  );
};

export default SearchForm;
