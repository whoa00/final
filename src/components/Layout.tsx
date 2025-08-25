import React, { ReactNode, useState } from 'react';
import { Layout as AntLayout, Typography } from 'antd';
import Navbar from './Navbar';
import Header from './Header';
import Footer from './Footer';
import { MergeOutlined } from '@ant-design/icons';

const { Content, Sider } = AntLayout;

interface LayoutProps {
  children: ReactNode;
  // isDarkMode: boolean;    // Receive isDarkMode prop
  // toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children 
  // ,isDarkMode, toggleTheme 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider
        width={200}
        style={{ position: 'fixed', height: '100vh', zIndex: 101 }}
        className={isSidebarOpen ? 'sidebar-open' : ''}
      >
        <div className="logo-placeholder">
          <MergeOutlined style={{ fontSize: '36px' }} />
          <Typography.Title level={4} style={{ color: 'inherit', margin: '8px 0 0 0' }}>CampSmart</Typography.Title>
        </div>
        <Navbar toggleSidebar={toggleSidebar} />
      </Sider>
      <AntLayout style={{ marginLeft: 200 }}>
        <Header toggleSidebar={toggleSidebar}
        //  isDarkMode={isDarkMode} toggleTheme={toggleTheme}
         />
        <Content style={{ padding: '88px 24px 24px 24px', minHeight: 'calc(100vh - 64px - 48px)' }}>
          {children}
        </Content>
        <Footer 
        // isDarkMode={isDarkMode}
        />
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;