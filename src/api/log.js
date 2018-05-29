import axios from 'axios';

const path = '/api/log';

export function post(log) {
  return axios.post(`${path}/post`, { log });
}

export function list({ lastLogId, limit = 10 }) {
  let listPath = `${path}/list?limit=${limit}`;
  if (lastLogId) {
    listPath = `${listPath}&logId=${lastLogId}`;
  }
  return axios.get(listPath);
}
