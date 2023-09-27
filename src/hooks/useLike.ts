import { useState } from 'react';

export const useLike = (likeInfo, userInfo) => {
  const [likeId, setLikeId] = useState(null);
  console.log('userInfo', userInfo);
  for (let i = 0; i < likeInfo.length; i++) {
    console.log(likeInfo[i].user, userInfo);
    if (likeInfo[i].user === userInfo) {
      setLikeId(likeInfo[i]._id);
    }
  }

  return likeId;
};
