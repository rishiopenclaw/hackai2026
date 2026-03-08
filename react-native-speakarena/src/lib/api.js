import AsyncStorage from '@react-native-async-storage/async-storage';

const fallbackBaseUrl = 'http://localhost:3000';
const envBaseUrl =
  typeof process !== 'undefined' && process?.env?.EXPO_PUBLIC_API_BASE_URL
    ? process.env.EXPO_PUBLIC_API_BASE_URL
    : '';

export const API_BASE_URL = (envBaseUrl || fallbackBaseUrl).replace(/\/+$/, '');
export const DEMO_USER_ID_KEY = 'demoUserId';

function withBase(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export async function apiFetch(path, options = {}) {
  const token = await AsyncStorage.getItem('userToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(withBase(path), {
    ...options,
    headers,
  });

  return response;
}

export async function apiJson(path, options = {}) {
  const response = await apiFetch(path, options);
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = data?.error || `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = data;
    throw error;
  }
  return data;
}

export async function bootstrapDemoSession({ displayName, email } = {}) {
  const data = await apiJson('/api/profiles/demo/bootstrap', {
    method: 'POST',
    body: JSON.stringify({ displayName, email }),
  });
  if (data?.user?._id) {
    await AsyncStorage.setItem(DEMO_USER_ID_KEY, data.user._id);
  }
  if (data?.token) {
    await AsyncStorage.setItem('userToken', data.token);
  }
  if (data?.user) {
    await AsyncStorage.setItem('userData', JSON.stringify({ ...data.user, token: data.token }));
  }
  return data;
}

export async function getDemoUserId() {
  return AsyncStorage.getItem(DEMO_USER_ID_KEY);
}
