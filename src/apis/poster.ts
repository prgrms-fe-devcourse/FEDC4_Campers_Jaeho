import { axiosInterface } from './axios';
import convertImagesToBase64 from '../utils/encode';

export const SingupPoster = async ({
  title,
  images,
  channelId,
}: {
  title: string;
  images: File[];
  channelId: string;
}) => {
  try {
    const imageBase64 = await convertImagesToBase64(images);
    const data = {
      title,
      image: imageBase64,
      channelId,
    };
    await axiosInterface.post('posts/create', data);
  } catch (error) {
    console.error(error);
  }
};
