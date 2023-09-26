import instance from './axios';
import { AxiosError } from 'axios';

type CommentData = {
  comment: string;
  postId: string;
};

export const createComment = async ({ comment, postId }: CommentData) => {
  try {
    const data = await instance.post('/comments/create', {
      comment,
      postId,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    } else if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};

export const deleteComment = async (id: string) => {
  try {
    const data = await instance.delete('comments/delete', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { id },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
