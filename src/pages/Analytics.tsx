import { Typography } from 'antd';
import React from 'react';


const Analytics: React.FC = () => {
  return (
    <div className="container">
      <Typography.Title level={1}>Analytics</Typography.Title>
      <Typography.Paragraph>
        View detailed analytics and reports related to your activities and projects.
      </Typography.Paragraph>
    </div>
  );
};

export default Analytics;