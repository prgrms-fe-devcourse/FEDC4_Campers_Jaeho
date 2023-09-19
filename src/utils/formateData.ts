export const formatDate = (inputString: string) => {
  const date = new Date(inputString);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
