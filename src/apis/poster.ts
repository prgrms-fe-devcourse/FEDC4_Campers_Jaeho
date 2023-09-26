import instance from './axios';
import { AxiosError } from 'axios';
import { PostResponse, CommentResponse, UpdatePost } from '../types/post';

export const createPoster = async (formData: FormData) => {
  try {
    console.log(formData.getAll('title'));
    const response = await instance.post('posts/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(response);

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    }
  }
};

// 특정 포스터 조회
export const searchPoster = async (postId: string) => {
  try {
    const { data } = await instance.get<PostResponse>(`posts/${postId}`);

    const {
      image,
      author: { fullName, image: authorImage, isOnline, _id },
      updatedAt,
    } = data;

    const commentInfo = data.comments.map(
      ({
        _id,
        comment,
        author: { fullName, isOnline, _id: author_id, image: author_image },
      }: CommentResponse) => ({
        _id,
        comment,
        fullName,
        isOnline,
        author_id,
        author_image,
      })
    );
    const likeInfo = data.likes.map(({ user }) => ({
      user,
    }));
    const { title, description } = JSON.parse(data.title);

    const response = {
      postInfo: {
        fullName,
        authorImage,
        image,
        isOnline,
        _id,
        updatedAt,
        title,
        description,
      },
      commentInfo,
      likeInfo,
    };

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error as Error);
    }
  }
};

// 내가 작성한 포스트 수정
export const updatePost = async (updateData: UpdatePost) => {
  try {
    const formData = new FormData();
    formData.append('postId', updateData.postId);
    formData.append('title', updateData.title);
    updateData.image && formData.append('image', updateData.image);
    updateData.imageToDeletePublicId &&
      formData.append('deleteId', updateData.imageToDeletePublicId);

    await instance.put('posts/update', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    }
  }
};
