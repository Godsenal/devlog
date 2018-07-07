import axios from 'axios';

const path = '/api/user';

export function get(nickname) {
  return axios.get(`${path}?nickname=${nickname}`);
}
export function bookmark({ logId, userId, isBookmarked }) {
  return axios.post(`${path}/bookmark`, { logId, userId, isBookmarked });
}
export function follow({ userId, followingId, isFollowed }) {
  return axios.post(`${path}/follow`, { userId, followingId, isFollowed });
}
export function listBookmark({ skip, limit }) {
  return axios.get(`${path}/bookmarks?skip=${skip}&limit=${limit}`);
}
export function listFollower({ nickname, skip, limit }) {
  return axios.get(`${path}/follower?nickname=${nickname}&skip=${skip}&limit=${limit}`);
}
export function listFollowing({ nickname, skip, limit }) {
  return axios.get(`${path}/following?nickname=${nickname}&skip=${skip}&limit=${limit}`);
}
