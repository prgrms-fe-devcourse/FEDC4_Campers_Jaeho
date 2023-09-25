export type NotificationInfo = {
  notificationType: 'COMMENT' | 'FOLLOW' | 'LIKE';
  notificationTypeId: string;
  userId: string;
  postId: string | null;
};
