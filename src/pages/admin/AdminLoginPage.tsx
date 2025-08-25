import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import styles from '../../styles/login.module.css';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const AdminLoginPage: React.FC = () => {
  const { adminLogin } = useAdminAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      // Send admin login request to backend
      const res = await axios.post(`${BASE_URL}/api/auth/admin/login`, {
        username: values.adminUsername,
        password: values.adminPassword,
      });
      // Assuming API returns { username, role: 'admin' }
      const { username } = res.data;
      adminLogin(username, () => {
        navigate('/admin/dashboard');
      });
    } catch (err) {
      console.error('Admin login error', err);
      form.setFields([
        { name: 'adminUsername', errors: ['Invalid username or password'] },
        { name: 'adminPassword', errors: ['Invalid username or password'] },
      ]);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Admin Login
        </Typography.Title>
        <Form
          form={form}
          name="admin_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Admin Username"
            name="adminUsername"
            rules={[{ required: true, message: 'Please input your Admin Username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Admin Password"
            name="adminPassword"
            rules={[{ required: true, message: 'Please input your Admin Password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Admin Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminLoginPage;