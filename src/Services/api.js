import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';
const KEY = '39810851-2f095e470d39af6a9025ff75b';

export const fetchPhotos = async params => {
  const { data } = await axios.get(`api/`, {
    params: {
      key: KEY,
      ...params,
    },
  });

  return data;
};
