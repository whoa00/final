import React from 'react';
import { Layout as AntLayout } from 'antd';
const { Footer: AntFooter } = AntLayout;

const Footer: React.FC = () => {
  return (
    <AntFooter
      className="site-footer"
      style={{
        textAlign: 'center',
        padding: '16px 0',
      }}
    >
      Team A ©{new Date().getFullYear()} Created by JY
    </AntFooter>
  );
};

export default Footer;