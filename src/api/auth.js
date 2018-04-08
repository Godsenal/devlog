import axios from 'axios';

export function login(username, password) {
  return axios.post('/api/auth/login', { username, password })
    .then((res) => ({
      ...res.data,
    }));
}

export function signup(username, password, nickname) {
  return axios.post('/api/auth/signup', { username, password, nickname })
    .then((res) => ({
      username: res.data.username,
      nickname: res.data.nickname,
    }));
}

