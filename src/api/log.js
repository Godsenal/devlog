import axios from 'axios';

const path = '/api/log';

export function post(log) {
  return axios.post(`${path}/post`, { log });
}

export function list({ skip, limit, author_nickname, star_user_id }) {
  let list_path = `${path}/list?limit=${limit}&skip=${skip}`;
  if (author_nickname) {
    list_path = `${list_path}&author_nickname=${author_nickname}`;
  }
  if (star_user_id) {
    list_path = `${list_path}&star_user_id=${star_user_id}`;
  }
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
