import axios from './axiosCustom';

// Auth
export const apiRegister = (username, email, password) => {
  return axios.post('/auth/register', { username, email, password });
};

export const apiLogin = (email, password) => {
  return axios.post('/auth/login', { email, password });
};

export const apiLogout = () => {
  return axios.post('/auth/logout');
};

// Account
export const apiGetUser = (uid) => {
  return axios.get(`/account/${uid}`);
};

export const apiUpdateUser = (uid, data) => {
  return axios.put(`/account/${uid}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Pin
export const apiCreatePin = (data) => {
  return axios.post('/pin', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const apiGetListPin = (page = 1, query = '') => {
  return axios.get(`/pin/?page=${page}&query=${query}`);
};

export const apiGetPin = (pid) => {
  return axios.get(`/pin/${pid}`);
};

export const apiQueryPins = (query = '') => {
  return axios.get(`/pin/?query=${query}`);
};

export const apiGetDetailPin = (pinId) => {
  return axios.get(`/pin/${pinId}`);
};

export const apiUpdatePin = (pinId, data) => {
  return axios.put(`/pin/${pinId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const apiDeletePin = (pinId) => {
  return axios.delete(`/pin/${pinId}`);
};
