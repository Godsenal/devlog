import axios from 'axios';

const CLOUD_NAME = 'godsenal';
const API_KEY = '267976555373664';
const UPLOAD_PRESET = 'tmgc7uu3';

const DEFAULT_PATH = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
export function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('tags', 'profile_image');
  // Replace the preset name with your own
  formData.append('api_key', API_KEY); // Replace API key with your own Cloudinary key
  const headers = { 'X-Requested-With': 'XMLHttpRequest' };
  return axios.post(DEFAULT_PATH, formData, { headers });
}
