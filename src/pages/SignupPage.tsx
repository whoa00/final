import React, { useState } from 'react';
import { Form, Input, Button, Typography, Space, DatePicker, Radio, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import style from '../styles/signup.module.css';
import moment from 'moment';


const BASE_URL = 'http://localhost:8080';


const SignUpPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formAntd] = Form.useForm();


  const [formData, setFormData] = useState({
    id: '',
    pwd: '',
    uname: '',
    bdate: '',
    gender: '',
    email: '',
    pnum: '',
    usurvey: [] as number[],
    role: 'guest' as 'guest' | 'host',
  });


  const [code, setCode] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [idChecked, setIdChecked] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'id') formAntd.setFields([{ name: 'id', errors: [] }]);
    if (name === 'pwd') formAntd.setFields([{ name: 'pwd', errors: [] }]);
    if (name === 'uname') formAntd.setFields([{ name: 'uname', errors: [] }]);
    if (name === 'email') formAntd.setFields([{ name: 'email', errors: [] }]);
    if (name === 'bdate') formAntd.setFields([{ name: 'bdate', errors: [] }]);
    if (name === 'gender') formAntd.setFields([{ name: 'gender', errors: [] }]);
    if (name === 'role') formAntd.setFields([{ name: 'role', errors: [] }]);
  };


  const handleDateChange = (date: moment.Moment | null, dateString: string | string[]) => {
    setFormData(prev => ({ ...prev, bdate: Array.isArray(dateString) ? dateString[0] : dateString }));
    formAntd.setFields([{ name: 'bdate', errors: [] }]);
  };


  const handleGenderChange = (e: any) => {
    setFormData(prev => ({ ...prev, gender: e.target.value }));
    formAntd.setFields([{ name: 'gender', errors: [] }]);
  };


  const handleRoleChange = (e: any) => {
    setFormData(prev => ({ ...prev, role: e.target.value }));
    formAntd.setFields([{ name: 'role', errors: [] }]);
  };


  const handleSurveyChange = (checkedValues: any) => {
    setFormData(prev => ({ ...prev, usurvey: checkedValues.map(Number) }));
  };


  const emailCheck = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/emailcheck`, { email: formData.email });
      if (res.data === 0) {
        setEmailMessage('Verification code has been sent.');
        setIsEmailVerified(false);
      } else {
        setEmailMessage('This email is already in use.');
      }
    } catch (err) {
      setEmailMessage('Error occurred during email verification.');
      console.error(err);
    }
  };


  const idCheck = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/signup/idcheck?id=${formData.id}`);
      if (res.data === 0) {
        setIdMessage('Available ID.');
        setIdChecked(true);
      } else {
        setIdMessage('This ID is already in use.');
        setIdChecked(false);
      }
    } catch (err) {
      setIdMessage('Failed to check ID duplication.');
      console.error(err);
    }
  };


  const checkEmailCode = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/emailcheck/certification`, { email: formData.email, code: code });
      const result = res.data;
      if (result.success) {
        setEmailMessage('Email verification successful.');
        setIsEmailVerified(true);
      } else {
        if (result.reason === 'exceeded') {
          setEmailMessage('You have exceeded 3 incorrect attempts.\nPlease request a new verification code.');
        } else if (result.reason === 'expired') {
          setEmailMessage('Verification code has expired.\nPlease request a new verification code.');
        } else if (result.reason === 'wrong') {
          setEmailMessage('Verification code does not match.');
        }
        setIsEmailVerified(false);
      }
    } catch (err) {
      setEmailMessage('Error occurred during email verification.');
      console.error(err);
    }
  };


  const onFinish = async (values: any) => {
    if (!idChecked) {
      formAntd.setFields([{ name: 'id', errors: ['ID duplication check is required.'] }]);
      return;
    }
    if (!isEmailVerified) {
      formAntd.setFields([{ name: 'email', errors: ['Please complete email verification first.'] }]);
      return;
    }


    try {
      const usurveyNumber = formData.usurvey.reduce((sum, val) => sum + Math.pow(2, val), 0);


      const postData = {
        id: formData.id,
        pwd: formData.pwd,
        uname: formData.uname,
        email: formData.email,
        bdate: formData.bdate,
        gender: formData.gender,
        usurvey: usurveyNumber,
        pnum: formData.pnum,
        role: formData.role,
      };


      await axios.post(`${BASE_URL}/signup/signup`, postData);


      alert('Sign up complete.');
      login(formData.id, formData.role, () => {
      navigate(formData.role === 'guest' ? '/profile' : '/dashboard');
      });
    } catch (err) {
      console.error('Sign up error', err);
      alert('Sign up failed.');
    }
  };


  return (
  
    <div className={style.signupContainer}>
      <div className={style.signupCard}>
        <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Sign Up</Typography.Title>
        <Form
          form={formAntd}
          name="register"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          initialValues={formData}
        >
          <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: 'Please enter your ID.' }]}
            validateStatus={idMessage ? 'error' : ''}
            help={idMessage || (formAntd.getFieldError('id').length > 0 ? formAntd.getFieldError('id')[0] : '')}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Input
                name="id"
                value={formData.id}
                onChange={handleInputChange}
              />
              <Button type="default" onClick={idCheck} className={style.inputGroupButton}>
                Check Duplication
              </Button>
            </Space.Compact>
          </Form.Item>


          <Form.Item
            label="Password"
            name="pwd"
            rules={[{ required: true, message: 'Password must be at least 6 characters.' }, { min: 6, message: 'Password must be at least 6 characters.' }]}
            hasFeedback
          >
            <Input.Password
              name="pwd"
              value={formData.pwd}
              onChange={handleInputChange}
            />
          </Form.Item>


          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={['pwd']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your Password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('pwd') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>


          <Form.Item
            label="Name"
            name="uname"
            rules={[{ required: true, message: 'Please enter your name.' }]}
          >
            <Input
              name="uname"
              value={formData.uname}
              onChange={handleInputChange}
            />
          </Form.Item>


          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email address.' }, { type: 'email', message: 'Please enter a valid email address.' }]}
            validateStatus={emailMessage.includes('Error') || emailMessage.includes('use') ? 'error' : (isEmailVerified ? 'success' : '')}
            help={emailMessage}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Button type="default" onClick={emailCheck} className={style.inputGroupButton}>
                Verify
              </Button>
            </Space.Compact>
          </Form.Item>


          <Form.Item
            label="Verification Code"
            name="code"
            rules={[{ required: !isEmailVerified, message: 'Please enter the verification code.' }]}
            validateStatus={isEmailVerified ? 'success' : (code && emailMessage.includes('match') ? 'error' : '')}
            help={emailMessage.includes('match') ? emailMessage : ''}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Input
                placeholder="Verification Code"
                name="code"
                value={code}
                onChange={e => setCode(e.target.value)}
                disabled={isEmailVerified}
              />
              <Button type="default" onClick={checkEmailCode} disabled={isEmailVerified} className={style.inputGroupButton}>
                Confirm
              </Button>
            </Space.Compact>
          </Form.Item>


          <Form.Item
            label="Phone Number"
            name="pnum"
            rules={[{ required: true, message: 'Please enter your phone number.' }]}
          >
            <Input
              name="pnum"
              value={formData.pnum}
              onChange={handleInputChange}
              placeholder="e.g., 010-1234-5678"
            />
          </Form.Item>


          <Form.Item
            label="Date of Birth"
            name="bdate"
            rules={[{ required: true, message: 'Please enter your date of birth.' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              onChange={handleDateChange}
              format="YYYY-MM-DD"
              value={formData.bdate ? moment(formData.bdate) : null}
            />
          </Form.Item>


          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select your gender.' }]}
          >
            <Radio.Group onChange={handleGenderChange} value={formData.gender} className={style.genderGroup}>
              <Radio value="남자">Male</Radio>
              <Radio value="여자">Female</Radio>
            </Radio.Group>
          </Form.Item>


          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select your role.' }]}
          >
            <Radio.Group onChange={handleRoleChange} value={formData.role} className={style.genderGroup}>
              <Radio value="guest">Guest</Radio>
              <Radio value="host">Host</Radio>
            </Radio.Group>
          </Form.Item>


          <Form.Item
            label="Interests (multiple selection possible)"
            name="usurvey"
          >
            <Checkbox.Group onChange={handleSurveyChange} value={formData.usurvey} className={style.surveyGroup}>
              <Checkbox value={0}>Hobbies</Checkbox>
              <Checkbox value={1}>Exercise</Checkbox>
              <Checkbox value={2}>Music</Checkbox>
              <Checkbox value={3}>Movies</Checkbox>
              <Checkbox value={4}>Reading</Checkbox>
              <Checkbox value={5}>Travel</Checkbox>
              <Checkbox value={6}>Technology</Checkbox>
            </Checkbox.Group>
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>


          <Form.Item>
            <Link to={'/login'}>
              <Button type="default" block>
                Log In
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
    
  );
};


export default SignUpPage;
