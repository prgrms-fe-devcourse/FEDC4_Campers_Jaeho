import instance from './axios';

export const CreatePoster = async (formData: FormData) => {
  try {
    const response = await instance.post('posts/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
