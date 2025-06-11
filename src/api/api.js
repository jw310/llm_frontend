import { paramsToQueryString } from '../utils/paramsToQueryString';

const BASE_URL = import.meta.env.VITE_API_URL;

const fetcher = async (url, method, { payload } = {}) => {
  const token = JSON.parse(localStorage.getItem('token'));
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && {
        Authorization: `Bearer ${token}`,
        'X-Auth-Token': token,
      }),
    };

    const response = await fetch(url, {
      method: method,
      headers: headers,
      ...((method === 'POST' ||
        method === 'PUT' ||
        method === 'PATCH' ||
        method === 'DELETE') && {
        body: JSON.stringify(payload),
      }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw error;
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const requestLoginApi = async (payload) => {
  try {
    // OATH2 認證要用 application/x-www-form-urlencoded 格式
    const formData = new URLSearchParams();
    formData.append('username', payload.username);
    formData.append('password', payload.password);
    formData.append('grant_type', 'password');

    const response = await fetch(`${BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (response.status === 422) {
      const errorData = await response.json();
      console.error('format error:', errorData.detail);
      // 在界面上顯示錯誤信息
      return { error: errorData.detail };
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const token = data.access_token;

    await new Promise((resolve) => setTimeout(resolve, 500));

    return token;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const getUserInfoByIdApi = async (userId) => {
  const queryString = paramsToQueryString({ uuid: userId });
  const response = await fetcher(`${BASE_URL}/users/uuid${queryString}`, 'GET');

  const { data } = response;

  await new Promise((resolve) => setTimeout(resolve, 500));

  return data;
};

export const getDashboardAppliesApi = async () => {
  const queryString = paramsToQueryString({ status: 2 });
  const response = await fetcher(`${BASE_URL}/dashboards${queryString}`, 'GET');

  const { data, pagination } = response;

  return { data, pagination };
};

export const uploadEmployeeFileApi = async (formData, employeeId) => {
  const token = JSON.parse(localStorage.getItem('token'));

  const response = await fetch(`${BASE_URL}employees/upload/${employeeId}`, {
    method: 'POST',
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
        'X-Auth-Token': token,
      }),
    },
    body: formData,
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  const { data } = await response.json();

  return data;
};

export const deleteUploadFileApi = async ({ payload, employeeId }) => {
  const response = await fetcher(
    `${BASE_URL}employees/upload/${employeeId}`,
    'DELETE',
    {
      payload,
    }
  );

  const { message } = response;

  return message;
};
