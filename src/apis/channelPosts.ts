import instance from './axios';
import { AxiosError } from 'axios';

export const getChannelPost = async (offset = 0, limit = 0) => {
  try {
    const { data } = await instance.get(
      `/posts/channel/64fbfdabe8468d1ed414e307?offset=${offset}&limit=${limit}`
    );
    console.log(data);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
    }
  }
};
