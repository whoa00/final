import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';


interface AdminUser {
  username: string;
  role: 'admin';
}


interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  adminLogin: (username: string, cb: () => void) => void;
  adminLogout: (cb?: () => void) => void;
}


const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);


export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);


  const adminLogin = useCallback((username: string, cb: () => void) => {
    setIsAdminAuthenticated(true);
    setAdminUser({ username, role: 'admin' });
    console.log('Admin logged in successfully.');
    cb();
  }, []);


  const adminLogout = useCallback((cb?: () => void) => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    console.log('Admin logged out.');
    if (cb) {
      cb();
    }
  }, []);


  const value = {
    isAdminAuthenticated,
    adminUser,
    adminLogin,
    adminLogout,
  };


  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};


export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
