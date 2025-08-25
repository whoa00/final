import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('guest' | 'host' | 'admin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      // Redirect based on role if not allowed
      if (user.role === 'guest') navigate('/profile', { replace: true });
      if (user.role === 'host') navigate('/dashboard', { replace: true });
      if (user.role === 'admin') navigate('/admin/dashboard', { replace: true });
    }
  }, [isLoggedIn, user, allowedRoles, navigate]);

  return isLoggedIn && (!allowedRoles || (user && allowedRoles.includes(user.role)))
    ? <>{children}</>
    : null;
};

export default ProtectedRoute;