const titleValidation = (title: string) => {
  try {
    const filterTitle = JSON.parse(title)['title']
      ? JSON.parse(title)['title']
      : title;

    return filterTitle;
  } catch (error) {
    return title;
  }
};

export default titleValidation;
