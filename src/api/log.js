import axios from 'axios';

const path = '/api/log';

export function post(log) {
  return axios.post(`${path}/post`, { log });
}

export function list({ skip, limit }) {
  const list_path = `${path}/list?limit=${limit}&skip=${skip}`;
  return axios.get(list_path);
}

export function get(logId) {
  return axios.get(`${path}/log/${logId}`);
}

export function star({ logId, userId, isStared }) {
  return axios.put(`${path}/star`, { logId, userId, isStared });
}

export function postComment(comment) {
  return axios.post(`${path}/comment`, { comment });
}

export function listComment(logId) {
  const list_path = `${path}/comment/list?log_id=${logId}`;
  return axios.get(list_path);
}
