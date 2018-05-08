import axios from 'axios';

export function searchTag(text) {
  return axios.get(`/api/tag/${text}`);
}
