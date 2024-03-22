import axios from 'axios';

const KEY_USER = 'user';
const KEY_TOKEN = 'token';
const KEY_SERVICE = 'service';
class Services {
  constructor() {
    this.axios = axios;
    this.interceptors = null;
    this.axios.defaults.withCredentials = false;
    // logout when response 401
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.clearUserInfoStorage();
          localStorage.removeItem(KEY_TOKEN);
          localStorage.removeItem(KEY_SERVICE);
          window.location.reload();
          return;
        }
        return Promise.reject(error);
      },
    );
    this.get = this.axios.get;
    this.post = this.axios.post;
    this.put = this.axios.put;
    this.delete = this.axios.delete;
    this.patch = this.axios.patch;
    this.interceptors = this.axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        window.sessionStorage.getItem(KEY_TOKEN)
          ? (config.headers['Authorization'] = `Bearer ${window.sessionStorage.getItem(KEY_TOKEN)}`)
          : null;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }

  attachTokenToHeader(token) {
    this.interceptors = this.axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }

  saveTokenStorage(token) {
    window.localStorage.setItem(KEY_TOKEN, token);
  }
  saveTokenSession(token) {
    window.sessionStorage.setItem(KEY_TOKEN, token);
  }

  //saveToLocalStorage
  saveUserInfoLocalStorage(user) {
    window.localStorage.setItem(KEY_USER, JSON.stringify(user))
  }

  //saveToSession
  saveUserInfoStorage(user) {
    window.sessionStorage.setItem(KEY_USER, JSON.stringify(user));
  }
  saveServiceStorage(service) {
    window.sessionStorage.setItem(KEY_SERVICE, service)
  }

  //getToSession
  getUserInfoStorage() {
    const userStorage = JSON.parse(window.sessionStorage.getItem(KEY_USER));

    if (userStorage === 'null') {
      return null;
    }

    return userStorage;
  }

  //getToLocalStorage
  getUserInfoLocalStorage() {
    const userStorage = JSON.parse(window.localStorage.getItem(KEY_USER));

    if (userStorage === 'null') {
      return null;
    }

    return userStorage;
  }

  getTokenSession() {
    const tokenStorage = window.sessionStorage.getItem(KEY_TOKEN);
    if (tokenStorage === 'null') {
      return null;
    }
    return tokenStorage;
  }

  getServiceStorage() {
    const serviceStorage = window.sessionStorage.getItem(KEY_SERVICE);
    if (serviceStorage === 'null') {
      return null;
    }
    return serviceStorage;
  }

  //clearToSessionStorage
  clearUserInfoStorage() {
    window.sessionStorage.removeItem(KEY_USER);
  }
  clearTokenSession() {
    window.sessionStorage.removeItem(KEY_TOKEN);
  }
  clearServiceStorage() {
    window.sessionStorage.removeItem(KEY_SERVICE)
  }

  removeInterceptors() {
    this.axios.interceptors.request.eject(this.interceptors);
  }

  source() {
    return this.axios.CancelToken.source();
  }

  isCancel(error) {
    return this.axios.isCancel(error);
  }
}

export default new Services();
