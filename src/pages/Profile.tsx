import { Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const Profile: React.FC = () => {
  return (

      <div className="container">
        <Typography.Title level={1}>Profile</Typography.Title>
        <Typography.Paragraph>
          Manage your profile information here.
        </Typography.Paragraph>
      </div>

  );
};

export default Profile;