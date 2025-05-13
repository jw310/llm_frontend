import { paramsToQueryString } from '@/util/index.jsx';

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
  const response = await fetcher(`${BASE_URL}/login`, 'POST', {
    payload,
  });

  const { data } = response;
  const token = data.token;

  await new Promise((resolve) => setTimeout(resolve, 500));

  return token;
};

export const getEmployeeInfoByIdApi = async (employeeId) => {
  const response = await fetcher(`${BASE_URL}employees/${employeeId}`, 'GET');

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