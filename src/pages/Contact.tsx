import { Typography, Switch, Space } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

interface ContactProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="container">
      <Typography.Title level={1}>Contact</Typography.Title>
      <Typography.Paragraph>
        Enter Contact Info Here
      </Typography.Paragraph>
      <Space>
        <span>Dark Mode</span>
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          checkedChildren="On"
          unCheckedChildren="Off"
        />
      </Space>
    </div>
  );
};

export default Contact;