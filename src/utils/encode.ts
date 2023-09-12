export default async function convertImagesToBase64(
  images: File[] | null
): Promise<string[]> {
  const base64Images: string[] = await Promise.all(
    images.map(async (imageFile) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && typeof event.target.result === 'string') {
            resolve(event.target.result);
          } else {
            reject(new Error('Failed to convert image to base64.'));
          }
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(imageFile);
      });
    })
  );
  return base64Images;
}
