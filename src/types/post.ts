import { User } from './user';

export type PostResponse = {
  likes: LikeResponse[];
  comments: CommentResponse[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: ChannelResponse;
  author: User;
  createdAt: string;
  updatedAt: string;
};

export type LikeResponse = {
  _id: string;
  user: string; // 사용자 id
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
};

export type CommentResponse = {
  _id: string;
  comment: string;
  author: User;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
};

export type ChannelResponse = {
  authRequired: boolean; // 사용되지 않음
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
