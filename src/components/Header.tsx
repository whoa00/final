import React, { useEffect, useState } from 'react';
import { Layout as AntLayout, Button, Space, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
 
const { Header: AntHeader } = AntLayout;
 
interface HeaderProps {
  toggleSidebar: () => void;
}
 
type Role = 'guest' | 'host' | 'admin';
 
type UserSession = {
  userUid: number;
  id: string;
  uname: string;
  role: Role;
};
 
const ROLE_MENUS: Record<Role, Array<{ label: string; to: string }>> = {
  guest: [{ label: 'Profile', to: '/profile' }],
  host: [{ label: 'HostPage', to: '/host' }],
  admin: [{ label: 'AdminPage', to: '/admin' }],
};
 
// Tag 색상
const ROLE_TAG_COLOR: Record<Role, string> = {
  admin: 'red',
  host: 'gold',
  guest: 'blue',
};
 
const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
 
  const [user, setUser] = useState<UserSession | null>(null);
  const loggedIn = !!user;
 
  useEffect(() => {
    const syncSession = async () => {
      try {
        const res = await api.get<UserSession>('/api/users/session');
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    syncSession();
    window.addEventListener('userChanged', syncSession);
    return () => window.removeEventListener('userChanged', syncSession);
  }, []);
 
  const handleLogout = async () => {
    try {
      await api.post('/api/users/logout');
    } catch {}
    sessionStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('userChanged'));
    logout?.(() => navigate('/login'));
  };
 
  const menus = user?.role ? ROLE_MENUS[user.role] : [];
 
  return (
    <AntHeader className="site-layout-header">
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={toggleSidebar}
        className="hamburger-menu"
        style={{ display: 'none' }}
      />
      <div className="app-title" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        Campify
      </div>
 
      <Space>
        {loggedIn ? (
          <>
            {/* 역할 태그 & 사용자명 */}
            <Tag color={ROLE_TAG_COLOR[user!.role]}>{user?.role}</Tag>
            <span style={{ marginRight: 8 }}>{user?.uname ?? user?.id}</span>
 
            {/* 역할별 메뉴 */}
            {menus.map((m) => (
              <Button key={m.to} type="text" onClick={() => navigate(m.to)}>
                {m.label}
              </Button>
            ))}
 
            {/* 로그아웃 */}
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button type="text" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button type="primary" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </>
        )}
      </Space>
    </AntHeader>
  );
};
 
export default Header;