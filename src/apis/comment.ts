import instance from './axios';
import { AxiosError } from 'axios';

type CommentData = {
  comment: string;
  postId: string;
};

export const createComment = async ({ comment, postId }: CommentData) => {
  try {
    await instance.post('/comments/create', {
      comment,
      postId,
    });
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
    await instance.delete('comments/delete', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { id },
    });
  } catch (error) {
    console.error(error);
  }
};
