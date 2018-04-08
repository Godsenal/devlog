import axios from 'axios';

export function login(username, password) {
  return axios.post('/api/auth/login', { username, password })
    .then(res => ({
      ...res.data,
    }))
    .catch(error => ({
      error: error.data.error,
    }));
}

export function signup(username, password, nickname) {
  return axios.post('/api/auth/signup', { username, password, nickname })
    .then(res => ({
      username: res.data.username,
      nickname: res.data.nickname,
    }))
    .catch(error => ({
      error: error.data.error,
    }));
}

export function verify(token) {
  const authStr = 'Bearer '.concat(token);
  return axios.get('/api/auth/verify', { headers: { Authorization: authStr } })
    .then(res => ({
      ...res.data,
    }))
    .catch(error => ({
      error: error.data.error,
    }));
}
