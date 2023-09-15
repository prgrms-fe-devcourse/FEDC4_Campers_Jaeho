import { axiosInterface } from './axios';

type CommentData = {
  comment: string;
  postId: string;
};
export const sendComment = async ({ comment, postId }: CommentData) => {
  try {
    await axiosInterface.post('/comments/create', {
      comment,
      postId,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (postId: string) => {
  try {
    await axiosInterface.delete(`/comments/delete/${postId}`);
  } catch (error) {
    console.error(error);
  }
};
