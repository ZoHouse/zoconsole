import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://zohm-api.up.railway.app/api/v1';

const getDeviceId = () => {
  let deviceId = localStorage.getItem('zo_device_id');
  if (!deviceId) {
    deviceId = `web-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('zo_device_id', deviceId);
  }
  return deviceId;
};

const getDeviceSecret = () => {
  let deviceSecret = localStorage.getItem('zo_device_secret');
  if (!deviceSecret) {
    deviceSecret = btoa(Date.now() + getDeviceId());
    localStorage.setItem('zo_device_secret', deviceSecret);
  }
  return deviceSecret;
};

export const zoServer = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'client-key': import.meta.env.VITE_ZO_CLIENT_KEY_WEB || '1482d843137574f36f74',
    'client-device-id': getDeviceId(),
    'client-device-secret': getDeviceSecret(),
  },
});

zoServer.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('zo_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Refresh device headers
    config.headers['client-device-id'] = getDeviceId();
    config.headers['client-device-secret'] = getDeviceSecret();
    return config;
  },
  (error) => Promise.reject(error)
);

zoServer.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('zo_token');
      localStorage.removeItem('zo_user');
      localStorage.removeItem('zo_token_valid_till');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
