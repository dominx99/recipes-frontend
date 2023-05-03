import axios from 'axios';
import CookeryExcludedPathsFromAuth from './router/CookeryExcludedPathsFromAuth';

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

    if (error.response.status === 401 && !CookeryExcludedPathsFromAuth.includes('/' + error.response.config.url)) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  });

  return instance;
};

export default axiosCallback;
