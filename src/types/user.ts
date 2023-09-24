import { PostResponse } from './post';

export type Follow = {
  _id: string;
  user: string;
  follower: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  image: string; // 프로필 이미지
  fullName: string;
  role: string;
  coverImage?: string; // 커버 이미지
  isOnline?: boolean;
  posts: PostResponse[];
  likes?: [];
  comments?: [];
  followers?: [];
  following?: Follow[];
  notifications?: [];
  messages?: [];
  email: string;
  createdAt?: string;
  updatedAt?: string;
  username?: string;
};

export type UserResponseData = {
  user: User;
};

export type NotificationResponse = {
  seen: boolean;
  _id: string;
  author: User;
  user: User | string;
  post?: string; // 포스트 id
  follow?: string; // 사용자 id
  comment?: Comment;
  message?: string; // 메시지 id
  createdAt: string;
  updatedAt: string;
};

export type MessageResponseData = {
  _id: string;
  message: string;
  sender: User;
  receiver: User;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ConversationResponseData = {
  _id: string[];
  message: string;
  sender: User;
  receiver: User;
  seen: boolean;
  createdAt: string;
};
