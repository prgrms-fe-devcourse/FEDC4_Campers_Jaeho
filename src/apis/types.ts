export type UserResponse = {
  coverImage: string; // 커버 이미지
  image: string; // 프로필 이미지
  role: string;
  emailVerified: boolean; // 사용되지 않음
  banned: boolean; // 사용되지 않음
  isOnline: boolean;
  posts: PostResponse[] | string[];
  likes: LikeResponse[];
  comments: string[];
  followers: [];
  following: [
    {
      _id: string;
      user: string;
      follower: string;
      createdAt: string;
      updatedAt: string;
      __v: 0;
    },
  ];
  notifications: Notification[];
  messages: MessageResponse[];
  _id: string;
  fullName: string;
  email: string;
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

export type PostResponse = {
  likes: LikeResponse[];
  comments: CommentResponse[];
  _id: string;
  image?: string;
  imagePublicId?: string;
  title: string;
  channel: ChannelResponse;
  author: UserResponse;
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
  author: UserResponse;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
};

export type NotificationResponse = {
  seen: boolean;
  _id: string;
  author: UserResponse;
  user: UserResponse | string;
  post?: string; // 포스트 id
  follow?: string; // 사용자 id
  comment?: Comment;
  message?: string; // 메시지 id
  createdAt: string;
  updatedAt: string;
};

export type FollowResponse = {
  _id: string;
  user: string; // 사용자 id
  follower: string; // 사용자 id
  createdAt: string;
  updatedAt: string;
};

export type ConversationResponse = {
  _id: string[];
  message: string;
  sender: UserResponse;
  receiver: UserResponse;
  seen: boolean;
  createdAt: string;
};

export type MessageResponse = {
  _id: string;
  message: string;
  sender: UserResponse;
  receiver: UserResponse;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
};
