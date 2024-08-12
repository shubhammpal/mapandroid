


import axios from 'axios';
import { useContext } from 'react';
import { getTokenAsyncStorage } from './auth_helper';
export const API_URL = 'http://3.111.234.55:6001';
export const POST_API_URL = 'http://3.111.234.55:6005';
export const GROUP_API_URL = 'http://3.111.234.55:6003';
export const EVENT_API_URL = 'http://3.111.234.55:6004';
export const CLUB_API_URL = 'http://3.111.234.55:6007';
export const MARKET_API_URL = 'http://3.111.234.55:6006';
export const NOTIFICATION_SEND_URL = 'http://3.111.234.55:6000';
export const MAP_URL = 'http://3.111.234.55:';
export const MAP_KEY = 'AIzaSyD2iCn1XM8zHTlJSYwPSnDAJM83m4PyBV4'
export const MAP_API_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
export const SHIP_ROCKET = 'https://apiv2.shiprocket.in/v1/external/'

const axiosApi = axios.create({ baseURL: API_URL });

axiosApi.interceptors.request.use(async function (config: any) {

  const details = await getTokenAsyncStorage();
  const token = details;
  config.headers.Authorization = `${token}`;
  return config;
});
axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);


export async function get(url: string, config = {}) {

  return await axiosApi.get(url, { ...config }).then(response =>response.data);
}

export async function post(url: string, data: any, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response?.data);
}



