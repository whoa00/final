import { Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  return (
    <div className="container">
      <Typography.Title level={1}>Dashboard</Typography.Title>
      <Typography.Paragraph>
      Dashboard
      </Typography.Paragraph>
    </div>
  );
};

export default Dashboard;