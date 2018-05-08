import axios from 'axios';

export function login(username, password) {
  return axios.post('/api/auth/login', { username, password });
}

export function signup(username, password, nickname) {
  return axios.post('/api/auth/signup', { username, password, nickname });
}

export function verify(token) {
  const authStr = 'Bearer '.concat(token);
  return axios.get('/api/auth/verify', { headers: { Authorization: authStr } });
}

export function validate(username) {
  return axios.post('/api/auth/validate', { username });
}
