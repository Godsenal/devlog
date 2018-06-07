import axios from 'axios';

const path = '/api/user';

export function bookmark({ logId, userId, isBookmarked }) {
  return axios.post(`${path}/bookmark`, { logId, userId, isBookmarked });
}
