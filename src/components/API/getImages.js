import axios from 'axios';

export const getImages = async (name, page) => {
  const params = new URLSearchParams({
    q: name,
    page: page,
    key: '34575125-34d98c7bc370876af411504a6',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while fetching images.');
  }
};