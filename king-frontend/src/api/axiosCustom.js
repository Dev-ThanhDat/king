import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true
});

const handleRefreshToken = async () => {
  const response = await instance.post('/auth/refreshtoken');
  if (response) {
    return response.newAccessToken;
  } else {
    return null;
  }
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response && response.data ? response.data : response;
  },
  async function (error) {
    if (error.config && error.response && +error.response.status === 401) {
      const newAccessToken = await handleRefreshToken();
      if (newAccessToken) {
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        localStorage.setItem('access_token', newAccessToken);
        return instance.request(error.config);
      }
    }
    if (
      error.config &&
      error.response &&
      +error.response.status === 500 &&
      error.config.url === '/auth/refreshtoken'
    ) {
      if (!window.location.pathname.includes('/login')) {
        window.location.assign('/login');
        localStorage.removeItem('access_token');
        localStorage.removeItem('persist:auth');
      }
    }
    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
