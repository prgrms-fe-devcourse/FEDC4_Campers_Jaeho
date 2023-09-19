import { PostResponse } from '../../../apis/types';
import { Grid, GridItem, Image } from '@chakra-ui/react';

const PostCard = ({ postData }: { postData: PostResponse }) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      <GridItem>
        <Image src={postData.image} />
      </GridItem>
    </Grid>
  );
};

export default PostCard;
