export type PosterInfo = {
  title: string;
  updatedAt: string;
  fullName: string;
  description: string;
  _id: string;
  isOnline: boolean;
};

export type CommentInfo = {
  _id: string;
  comment: string;
  fullName: string;
  isOnline: boolean;
};

export type SearchPosterResponse = {
  posterInfo: PosterInfo;
  commentInfo: CommentInfo[];
  likeCount: number;
};
