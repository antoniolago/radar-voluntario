import { CONFIG } from '@/configs';
import axios from 'axios';
const API_URL = "/api";
export const api = {
    get: <T>(url: string, params?: object) =>
      axios.get<T>(url, {
        baseURL: API_URL,
        ...params,
      }),
    post: <T>(url: string, data: any) =>
      axios.post<T>(url, data, {
        baseURL: API_URL,
      }),
    patch: <T>(url: string, data: any) =>
      axios.patch<T>(url, data, {
        baseURL: API_URL,
      }),
    delete: <T>(url: string) =>
      axios.delete<T>(url, {
        baseURL: API_URL,
      }),
  };