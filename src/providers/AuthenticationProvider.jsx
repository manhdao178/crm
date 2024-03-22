import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import HttpService from 'services/httpServices';
import { showError, showSuccess } from 'helpers/toast';
import { SIGNIN_URL } from 'constants/api';
import callServices from 'services/callServices';
import authServices from 'services/authServices';
import { parseNameLine } from 'helpers';

const AuthenticationContext = createContext({
  token: '',
  isLogged: false,
  isLoggingOut: false,
  login: () => {},
  logout: () => {},
  serviceSelected: '',
  chooseService: () => {},
  userInfo: {},
  callingMethod: new callServices(),
});

export const useAuthentication = () => useContext(AuthenticationContext);

let timerInterval = null;
const AuthProvider = ({ children }) => {
  //! State

  const tokenLocalStorage = HttpService.getTokenSession();
  const servicesLocalStorage = HttpService.getServiceStorage();
  const userInfoStorage = HttpService.getUserInfoStorage();
  const lineStorage = callServices.getLine();
  const isHasLine = lineStorage ? Object.keys(lineStorage).length !== 0 : lineStorage !== null;

  const callingMethod = useRef(
    lineStorage ? new callServices({ uri: parseNameLine(lineStorage.name), password: lineStorage.password }) : null,
  );

  const [isLogged, setIsLogged] = useState(tokenLocalStorage ? true : false);
  const [isLoggingOut, setLoggingOut] = useState(false);
  const [serviceSelected, setServiceSelected] = useState(servicesLocalStorage ? servicesLocalStorage : '');
  const [userInfo, setUserInfo] = useState(userInfoStorage || {});
  const [token, setToken] = useState(tokenLocalStorage || '');

  useEffect(() => {
    const stopUA = () => {
      callingMethod.current && callingMethod.current.stop();
    };

    const service = HttpService.getServiceStorage();
    if (tokenLocalStorage) {
      setIsLogged(true);
      HttpService.attachTokenToHeader(tokenLocalStorage);
    }
    if (service) setServiceSelected(service);

    window.addEventListener('beforeunload', stopUA);
    return () => {
      window.removeEventListener('beforeunload', stopUA);
    };
  }, []);

  //! Check calling service is Ready
  useEffect(() => {
    if (isLogged && isHasLine) {
      timerInterval = setInterval(() => {
        if (!callingMethod.current.checkReady()) {
          console.log('start instance call service');
          callingMethod.current.start();
          clearInterval(timerInterval);
        }
      }, 500);
    } else {
    }
  }, [isLogged]);

  //! Function
  const chooseService = useCallback((arg) => {
    setServiceSelected(arg);
  }, []);

  const login = useCallback(async ({ username, password, remember, onLoading }) => {
    try {
      onLoading(true);

      //* Get access token
      const res = await HttpService.post(SIGNIN_URL, { username, password });
      const { access_token, user } = res.data.data;

      // remember && HttpService.saveTokenStorage(access_token);
      HttpService.saveTokenSession(access_token);
      HttpService.attachTokenToHeader(access_token);
      HttpService.saveUserInfoStorage(user);
      remember && HttpService.saveUserInfoLocalStorage(user);
      !remember && localStorage.removeItem('user');

      //* Get auth line
      const resDataLine = await authServices.getAuthLine();
      const { name: nameLine, password: passwordLine } = resDataLine?.data?.data;
      callServices.saveLine({ name: nameLine, password: passwordLine });
      callingMethod.current = new callServices({
        uri: parseNameLine(nameLine),
        password: passwordLine,
      });

      showSuccess('Login successfully');
      setToken(access_token);
      setUserInfo(user);
      setIsLogged(true);
      onLoading(false);
    } catch (error) {
      showError(error?.response?.data.messages[0] || 'Something went wrong', { autoClose: 3000 });
      onLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        setLoggingOut(true);
        HttpService.clearUserInfoStorage();
        HttpService.clearTokenSession();
        HttpService.clearServiceStorage();
        callServices.clearLine();
        callingMethod.current.stop();
        sessionStorage.removeItem('path');
        window.location.reload();
        resolve();
      } catch (error) {
        showError(error.toString());
        setLoggingOut(false);
        reject(error);
      }
    });
  }, []);

  //! Render
  const value = useMemo(() => {
    return {
      isLogged,
      isLoggingOut,
      login,
      logout,
      serviceSelected,
      chooseService,
      token,
      userInfo,
      callingMethod: callingMethod.current,
    };
  }, [isLogged, login, logout, serviceSelected, isLoggingOut, chooseService, token, userInfo, callingMethod.current]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export default AuthProvider;
