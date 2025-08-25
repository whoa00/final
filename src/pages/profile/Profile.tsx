import { Button, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import styles from '../profile/css/profile.module.css';
import { DollarOutlined, FormOutlined, HistoryOutlined,  QuestionCircleOutlined, ScheduleOutlined, SettingOutlined, SoundOutlined, UserOutlined } from '@ant-design/icons';
import ProfileReform from './ProfileReform';
import JokeDisplay from '../../components/JokeDisplay';
import { NavLink } from 'react-router-dom';
import RequestHost from './RequestHost';
 
const { Title } = Typography;
 
const Profile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  // const toggle = () => {setIsOpen((prev) => !prev)}
  const showModal = () => {
    setIsOpen(true);
  };
  const showModal2 = () => {
    setIsOpen2(true);
  };
  const showModal3 = () => {
    setIsOpen3(true);
  };
  const handleOk = () => {
    setIsOpen(false);
    alert("정말로 수정하시겠습니까?")
  };
  const handleOk2 = () => {
    setIsOpen2(false);
  };
  const handleOk3 = () => {
    setIsOpen3(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleCancel2 = () => {
    setIsOpen2(false);
  };
  const handleCancel3 = () => {
    setIsOpen3(false);
  };
 
  return (
      <div className="container">
        {/* <Title level={5}>Profile</Title> */}
        {/* <Paragraph></ Paragraph> */}
          {/* Manage your profile information here. */}
         
          <form>
            <h1>DashBoard</h1>
            <div className={styles.block}>
              <tr>
                <NavLink to={"/profile/point"}>
                <h1><DollarOutlined /></h1>
                <td>포인트</td>
                <td>???</td>
                </NavLink>
              </tr>
              <tr>
                <NavLink to={"/profile/reserve"}>
                <h1><ScheduleOutlined /></h1>
                <td>예약</td>
                <td>1</td>
                </NavLink>
              </tr>
              <tr>
                <h1><HistoryOutlined /></h1>
                <td>지난 예약 기록</td>
                <h5>자세히보기</h5>
              </tr>
            </div>
            <div className={styles.menu}>
              {/* <Calendar /> */}
              <h2><SettingOutlined /> 설정</h2>
              <tr>
                <td>
                  <Button type="link" onClick={showModal}>
                  <h1><UserOutlined /></h1>
                  <p>개인정보 수정</p>
                  </Button>
                  <Modal
                    title="개인정보 수정"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={600}
                  ><ProfileReform/></Modal>
                </td>
                <td>
                  <h1><SoundOutlined /></h1>
                  <p>공지사항</p>
                </td>
                <td>
                  <Button type="link" onClick={showModal3}>
                  <h1><FormOutlined /></h1>
                  <p>호스트 신청</p>
                  </Button>
                  <Modal
                    title="호스트 신청"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isOpen3}
                    onOk={handleOk3}
                    onCancel={handleCancel3}
                    width={530}
                    height={700}
                   
                  ><RequestHost /></Modal>
                </td>
                <td>
                  <Button type="link" onClick={showModal2}>
                  <h1><QuestionCircleOutlined /></h1>
                  <p>오늘의 영어 유머</p>
                  </Button>
                  <Modal
                    title="오늘의 영어 유머"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isOpen2}
                    onOk={handleOk2}
                    onCancel={handleCancel2}
                    width={800}
                   
                  ><JokeDisplay /></Modal>
                  </td>
              </tr>
            </div>
          </form>
       
      </div>
 
  );
};
 
export default Profile;