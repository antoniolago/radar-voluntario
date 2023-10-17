import { CONFIG } from '@/configs';
import { IToken } from '@/types/token';
import axios, { AxiosError } from 'axios';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
export const AuthCookieName = "auth_token";
const API_URL = `${CONFIG.API_URL || ''}/api`;
export const useApi = () => {
  const api = axios.create({
    baseURL: API_URL,
  });

  api.interceptors.request.use(async (config) => {
    const token = Cookies.get(AuthCookieName);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error: AxiosError) {
      if (401 === error?.response?.status) {
        logout();
        // alert("Houve um problema de autenticação, por favor logue novamente.");
        // if(window.location.href.includes("/login"))
        //   window.location.href = "/login";
      } else {
        return Promise.reject(error);
      }
    }
  );
  return api;
}
export const setToken = (token: string) => {
  Cookies.set(AuthCookieName, token);
};
const getToken = () => {
  return Cookies.get(AuthCookieName);
};
const getDecodedToken = (): IToken => {
  return jwt_decode(getToken()!);
}
const logout = () => {
  Cookies.remove(AuthCookieName);
  // window.location.href = "/login";
}
const isLogado = () => {
  const token = getDecodedToken();
  // return token?.usuarioProfessor != undefined;
  return token != undefined;
  // return api.get("auth/validar")
  // .then((res: AxiosResponse<ApiResponse>) => {
  //   return res.data.type == ResponseType.Success;
  // })
  // .catch(() => {
  //   return false;
  // });
}