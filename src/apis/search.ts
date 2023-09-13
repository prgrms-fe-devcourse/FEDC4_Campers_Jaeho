import { axiosInterface } from './axios';

type ChannelInfo = { _id: string; image: number | null };

type AuthorInfo = { fullName: string; isOnline: boolean };

type Likes = {
  _id: string;
  user: string;
  post: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type PosterParams = {
  title: string;
  updatedAt: string;
  channel: ChannelInfo;
  likes: Likes[];
};

type UserParams = {
  fullName: string;
  _id: string;
  isOnline: boolean;
};

type SearchUserParams = UserParams & {
  createdAt: string;
  title?: string;
};

type CommentInfo = {
  _id: string;
  comment: string;
  author: AuthorInfo;
};

// 특정 포스터 조회
export const searchPoster = async (id: string) => {
  try {
    const {
      data: {
        title,
        updatedAt,
        author: { fullName, _id, isOnline },
        comments,
        likes,
        channel: { description },
      },
    } = await axiosInterface.get(`posts/${id}`);

    const commentInfo = comments.map(
      ({ _id, comment, author: { fullName, isOnline } }: CommentInfo) => {
        ({
          _id,
          comment,
          fullName,
          isOnline,
        });
      }
    );

    return {
      posterInfo: {
        title,
        updatedAt,
        fullName,
        description,
        _id,
        isOnline,
      },
      commentInfo,
      likeCount: likes.length,
    };
  } catch (error) {
    console.error(error as Error);
  }
};

// 채널 전체 데이터 표시
export const searchPosterAll = async (id: string) => {
  try {
    const { data } = await axiosInterface.get(`posts/channel/${id}`);

    return data.map(
      ({
        title,
        updatedAt,
        channel: { _id, image = null },
        likes,
      }: PosterParams) => ({
        title,
        updatedAt,
        _id,
        image,
        likeCount: likes.length,
      })
    );
  } catch (error) {
    console.error(error as Error);
  }
};

// 전체 유저 검색
export const searchUserAll = async () => {
  try {
    const { data } = await axiosInterface.get('users/get-users');

    return data.map(({ _id, fullName, isOnline }: UserParams) => ({
      _id,
      fullName,
      isOnline,
    }));
  } catch (error) {
    console.error(error as Error);
  }
};

// 접속중인 유저 검색
export const searchUserOnline = async () => {
  try {
    const { data } = await axiosInterface.get('users/online-users');

    return data.map(({ _id, fullName, isOnline }: UserParams) => {
      ({ _id, fullName, isOnline });
    });
  } catch (error) {
    console.error(error as Error);
  }
};

// 유저이름 검색
export const searchUser = async (username: string) => {
  try {
    const { data } = await axiosInterface.get(`search/users/${username}`);

    return data.map(
      ({ _id, fullName, isOnline, createdAt }: SearchUserParams) => {
        ({ _id, fullName, isOnline, createdAt });
      }
    );
  } catch (error) {
    console.error(error as Error);
  }
};

// 모든 검색
export const searchAll = async (title: string) => {
  try {
    const { data } = await axiosInterface.get(`search/all/${title}`);

    return data.map(
      ({ _id, fullName, isOnline, createdAt, title }: SearchUserParams) => {
        ({ _id, fullName, isOnline, createdAt, title });
      }
    );
  } catch (error) {
    console.error(error as Error);
  }
};
