import axios from 'axios';

const path = '/api/search';
export function searchPre(q) {
  return axios.get(`${path}?q=${q}`);
}
export function searchUser({ skip, limit, q }) {
  return axios.get(`${path}/users?q=${q}&skip=${skip}&limit=${limit}`);
}
export function searchLog({ skip, limit, q }) {
  return axios.get(`${path}/logs?q=${q}&skip=${skip}&limit=${limit}`);
}
export function searchTag({ skip, limit, q }) {
  return axios.get(`${path}/tags?q=${q}&skip=${skip}&limit=${limit}`);
}
