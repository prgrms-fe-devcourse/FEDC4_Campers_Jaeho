import { axiosInterface } from './axios';
import { AxiosError } from 'axios';

type CommentData = {
  comment: string;
  postId: string;
};

export const createComment = async ({ comment, postId }: CommentData) => {
  try {
    await axiosInterface.post('/comments/create', {
      comment,
      postId,
    });
    alert('success');
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

export const deleteComment = async (Id: string) => {
  try {
    await axiosInterface.delete(`/comments/delete/${Id}`);
    alert('success');
  } catch (error) {
    console.error(error);
  }
};
