import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/Cognito/UseAuth';
import SignOutView from '@/components/Cognito/Logout';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  if (!isAuthenticated) {
    return <SignOutView />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
