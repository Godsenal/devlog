import axios from 'axios';

const path = '/api/auth';
export function login(username, password) {
  return axios.post(`${path}/login`, { username, password });
}

export function signup(username, password, nickname) {
  return axios.post(`${path}/signup`, { username, password, nickname });
}

export function verify() {
  return axios.get(`${path}/verify`);
}

// validate uesr form.
export function validate({ field, value }) {
  return axios.post(`${path}/validate`, { field, value });
}
