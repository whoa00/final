import React from 'react';
import { Form, Input, Button, Typography, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/login.module.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { login } = useAuth();

  const onFinish = async (values: { id: string; pwd: string }) => {
    try {
      const res = await api.post('/api/users/login', values);
      const result = res.data;
      if (!result?.success) {
        return alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      }

      const ses = await api.get('/api/users/session').catch(() => null);
      const user = ses?.status === 200 ? ses.data : result.user;

      // Update context and persist
      login(user.username, user.role, () => navigate('/'));
    } catch (error: any) {
      alert('서버 오류: ' + (error?.message ?? '알 수 없는 오류'));
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          Login
        </Typography.Title>

        <Form form={form} name="login" layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Input ID' }]}>
            <Input placeholder="ID" />
          </Form.Item>
          <Form.Item label="Password" name="pwd" rules={[{ required: true, message: 'Input Password' }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block className={styles.primaryButton}>
              Login
            </Button>
          </Form.Item>
        </Form>

        <Divider className={styles.divider}>or</Divider>
        <Typography.Text style={{ display: 'block', textAlign: 'center', marginTop: 16 }}>
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </Typography.Text>
      </div>
    </div>
  );
};

export default LoginPage;