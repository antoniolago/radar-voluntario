import { CONFIG } from "./configs";

export const apiRoutes = {
    login: CONFIG.API_URL + '/accounts/login',
    loginGoogle: CONFIG.API_URL + '/accounts/login-google',
    getAppSettings: CONFIG.API_URL + '/appsettings',
    getUser: CONFIG.API_URL + '/accounts'
  };
  
  export const pageRoutes = {
    main: '/',
    auth: '/auth',
    appointment: '/appointment/:id',
  };