import axios from 'axios';

const path = '/api/auth';
export function login(username, password) {
  return axios.post(`${path}/login`, { username, password });
}

export function signup(username, password, nickname) {
  return axios.post(`${path}/signup`, { username, password, nickname });
}

export function verify(token) {
  const authStr = 'Bearer '.concat(token);
  return axios.get(`${path}/verify`, { headers: { Authorization: authStr } });
}

export function validate(username) {
  return axios.post(`${path}/validate`, { username });
}
