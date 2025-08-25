import React from 'react'
import styles from '../profile/css/reform.module.css'

const ProfileReform: React.FC = () => {
  return (
    <div className={styles.form}>
      <p>이름</p>
      <tr>
        <input type="text" />
      </tr>
      <p>아이디</p>
      <tr>
        <input type="text" disabled/>
      </tr>
      <p>비밀번호</p>
      <tr>  
        <input type="password" />
        <p>비밀번호 확인</p>
        <input type="password" />
      </tr>
      <p>전화번호</p>
      <tr>  
        <input type="tel"/>
      </tr>
      <p>이메일</p>
      <tr>  
        <input type="email" />
        <p>이메일 인증</p>
        <input type="text" />
      </tr>
      <p>생년월일</p>
      <tr>  
        <input type="text" disabled/>
      </tr>
    </div>
  )
}

export default ProfileReform