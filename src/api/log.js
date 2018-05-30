import axios from 'axios';

const path = '/api/log';

export function post(log) {
  return axios.post(`${path}/post`, { log });
}

export function list({ skip, limit }) {
  const list_path = `${path}/list?limit=${limit}&skip=${skip}`;
  return axios.get(list_path);
}
