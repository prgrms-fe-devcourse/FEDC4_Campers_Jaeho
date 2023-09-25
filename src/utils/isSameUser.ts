export const isSameUser = (userId: string, myId: string) => {
  if (userId === myId) {
    return true;
  }

  return false;
};
