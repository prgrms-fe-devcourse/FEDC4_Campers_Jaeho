import instance from './axios';

export const getNotification = async (token: string) => {
  try {
    const { data } = await instance.get('/notifications', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
