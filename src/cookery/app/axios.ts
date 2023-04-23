import axios from 'axios';

const axiosCallback = () => {
  const details = localStorage.getItem('AUTHENTICATION_DETAILS');
  const parsedDetails = JSON.parse(details ? details : '{}');

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      Authorization: 'Bearer ' + (typeof parsedDetails.token === 'string' ? parsedDetails.token : ''),
    },
  });

  instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 401 && error.response.data.message === 'Expired JWT Token') {
      localStorage.removeItem('AUTHENTICATION_DETAILS');
    }

    return Promise.reject(error);
  });

  return instance;
};

export default axiosCallback;
