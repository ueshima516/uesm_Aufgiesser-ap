import React, { createContext, useContext, useEffect, useState } from 'react';
import Amplify from '@aws-amplify/core';
import { Auth } from 'aws-amplify';

const AwsConfigAuth = {
  region: 'ap-northeast-1',
  userPoolId: 'ap-northeast-1_ITapHFBZI',
  userPoolWebClientId: '38ptt0h32b4pcop6frkjg5ms88',
  cookieStorage: {
    domain: 'localhost',  // 本番環境ではこれにする→ fitshow-ap.com
    path: '/',
    expires: 365,
    sameSite: 'strict',
    secure: true
  },
  authenticationFlowType: 'USER_SRP_AUTH',
};

Amplify.configure({ Auth: AwsConfigAuth });

const authContext = createContext({});

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [idToken, setIdToken] = useState('');

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(async (result) => {
        setUsername(result.username);
        setIsAuthenticated(true);

        const currentSession = await Auth.currentSession();
        const currentIdToken = currentSession.getIdToken().getJwtToken();
        setIdToken(currentIdToken);

        setIsLoading(false);
      })
      .catch(() => {
        setUsername('');
        setIsAuthenticated(false);
        setIdToken('');
        setIsLoading(false);
      });
  }, []);

  const signUp = async (username, password) => {
    try {
      await Auth.signUp({ username, password });
      setUsername(username);
      setPassword(password);
      return { success: true, message: '' };
    } catch (error) {
      return {
        success: false,
        message: '認証に失敗しました。',
      };
    }
  };

  const confirmSignUp = async (verificationCode) => {
    try {
      await Auth.confirmSignUp(username, verificationCode);
      const result = await signIn(username, password);
      setPassword('');
      return result;
    } catch (error) {
      return {
        success: false,
        message: '認証に失敗しました。',
      };
    }
  };

  const signIn = async (username, password) => {
    try {
      const result = await Auth.signIn(username, password);
      const currentSession = await Auth.currentSession();
      const currentIdToken = currentSession.getIdToken().getJwtToken();

      setUsername(result.username);
      setIsAuthenticated(true);
      setIdToken(currentIdToken);

      return { success: true, message: '' };
    } catch (error) {
      return {
        success: false,
        message: '認証に失敗しました。',
      };
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUsername('');
      setIsAuthenticated(false);
      return { success: true, message: 'ログアウトしました' };
    } catch (error) {
      return {
        success: false,
        message: 'ログアウトに失敗しました。',
      };
    }
  };

  return {
    isLoading,
    isAuthenticated,
    username,
    idToken,
    signUp,
    confirmSignUp,
    signIn,
    signOut,
  };
};
