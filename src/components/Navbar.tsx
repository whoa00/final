import { Menu } from 'antd';
import {
  HomeOutlined, DashboardOutlined, UserOutlined, SettingOutlined,
  LineChartOutlined, ProjectOutlined, MailOutlined, TeamOutlined,
  ControlOutlined, BulbOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const { user } = useAuth();

  const guestMenuItems = [
    { key: '/', icon: <HomeOutlined />, label: <Link to="/" onClick={toggleSidebar}>홈</Link> },
    { key: '/projects', icon: <ProjectOutlined />, label: <Link to="/projects" onClick={toggleSidebar}>커뮤니티</Link> },
    { key: '/profile', icon: <UserOutlined />, label: <Link to="/profile" onClick={toggleSidebar}>마이페이지</Link> },
    { key: '/contact', icon: <SettingOutlined />, label: <Link to="/contact" onClick={toggleSidebar}>설정</Link> },
    { key: '/notice', icon: <BulbOutlined />, label: <Link to="/notice" onClick={toggleSidebar}>공지사항</Link> },
  ];

  const hostMenuItems = [
    { key: '/', icon: <HomeOutlined />, label: <Link to="/" onClick={toggleSidebar}>홈</Link> },
    { key: '/projects', icon: <ProjectOutlined />, label: <Link to="/projects" onClick={toggleSidebar}>커뮤니티</Link> },
    { key: '/host/dashboard', icon: <DashboardOutlined />, label: <Link to="/host/dashboard" onClick={toggleSidebar}>관리 대시보드</Link> },
    { key: '/profile', icon: <UserOutlined />, label: <Link to="/profile" onClick={toggleSidebar}>마이페이지</Link> },
    { key: '/contact', icon: <SettingOutlined />, label: <Link to="/contact" onClick={toggleSidebar}>설정</Link> },
  ];

  const adminMenuItems = [
    { key: '/admin/dashboard', icon: <DashboardOutlined />, label: <Link to="/admin/dashboard" onClick={toggleSidebar}>Admin Dashboard</Link> },
    { key: '/admin/users', icon: <TeamOutlined />, label: <Link to="/admin/users" onClick={toggleSidebar}>User Management</Link> },
    { key: '/admin/settings', icon: <ControlOutlined />, label: <Link to="/admin/settings" onClick={toggleSidebar}>System Settings</Link> },
    { key: '/admin/analytics', icon: <LineChartOutlined />, label: <Link to="/admin/analytics" onClick={toggleSidebar}>Analytics</Link> },
  ];

  let menuItems = guestMenuItems;
  if (user?.role === 'admin') menuItems = adminMenuItems;
  else if (user?.role === 'host') menuItems = hostMenuItems;

  return (
    <div className="navbar">
      <Menu
        mode="vertical"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{
          width: 200,
          height: 'calc(100vh - 120px)',
          borderRight: 0,
          paddingTop: '0px',
          background: 'var(--antd-background)',
          color: 'var(--text-color)',
        }}
        theme="light"
      />
    </div>
  );
};

export default Navbar;