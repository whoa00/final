import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  role: 'guest' | 'host' | 'admin';
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (username: string, role: 'guest' | 'host' | 'admin', cb?: () => void) => void;
  logout: (cb?: () => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Restore session on first load
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (username: string, role: 'guest' | 'host' | 'admin', cb?: () => void) => {
    const newUser = { username, role };
    setUser(newUser);
    setIsLoggedIn(true);
    sessionStorage.setItem('user', JSON.stringify(newUser));
    if (cb) cb();
  };

  const logout = (cb?: () => void) => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('user');
    if (cb) cb();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};