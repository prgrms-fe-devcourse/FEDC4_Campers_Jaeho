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
  posts?: [];
  likes?: [];
  comments?: [];
  followers?: [];
  following?: Follow[];
  notifications?: [];
  messages?: [];
  email?: string;
  createdAt?: string;
  updatedAt?: string;
  username?: string;
};

export type UserResponseData = {
  user: User;
};
