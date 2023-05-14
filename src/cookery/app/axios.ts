import axios from 'axios';
import { each } from 'immer/dist/internal';
import CookeryExcludedPathsFromAuth, { ExcludedPath } from './router/CookeryExcludedPathsFromAuth';

const axiosCallback = () => {
  const details = localStorage.getItem('AUTHENTICATION_DETAILS');
  const parsedDetails = JSON.parse(details ? details : '{}');

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      Authorization: 'Bearer ' + (typeof parsedDetails.token === 'string' ? parsedDetails.token : ''),
    },
  });

  instance.interceptors.response.use(function(response) {
    return response;
  }, function(error) {
    if (error.response.status === 401 && error.response.data.message === 'Expired JWT Token') {
      localStorage.removeItem('AUTHENTICATION_DETAILS');
    }

    if (error.response.status === 401) {
      const matchingExcludedPaths = CookeryExcludedPathsFromAuth.filter((path: ExcludedPath) => {
        if (path.path === ('/' + error.response.config.url) && path.method === error.response.config.method) {
          return true;
        }

        return false;
      });

      if (matchingExcludedPaths.length > 0) {
        return;
      }

      window.location.href = '/login';
    }

    return Promise.reject(error);
  });

  return instance;
};

export default axiosCallback;
