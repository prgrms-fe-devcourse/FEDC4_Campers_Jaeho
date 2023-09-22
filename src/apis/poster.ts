import instance from './axios';
import { AxiosError } from 'axios';
import { PostResponse, CommentResponse } from '../types/post';

export const CreatePoster = async (formData: FormData) => {
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

    const commentInfo = data.comments.map(
      ({ _id, comment, author: { fullName, isOnline } }: CommentResponse) => {
        ({
          _id,
          comment,
          fullName,
          isOnline,
        });
      }
    );

    const { title, description } = JSON.parse(data.title);

    return {
      posterInfo: { ...data, title, description },
      commentInfo,
      likeCount: data.likes.length,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error as Error);
    }
  }
};
