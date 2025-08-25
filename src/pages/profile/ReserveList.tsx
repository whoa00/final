import React from 'react'
import {CheckOutlined, DatabaseOutlined, HistoryOutlined, LoadingOutlined} from '@ant-design/icons';
import styles from '../profile/css/reserve.module.css'

const ReserveList: React.FC = () => {
  return (
    <div>
      <h1><DatabaseOutlined /> 예약현황</h1>
      <div className={styles.container}>
        <div>
          <tr className={styles.bar}>
            <h1><LoadingOutlined /></h1>
            <th>결제 대기중</th>
            <p>3  건</p>
          </tr>
          <div className={styles.card}>
            <tr>
              <th>사진</th>
              <td>캠핑장이름</td>
              <td>날짜</td>
            </tr>
            <tr>
              <th>사진</th>
              <td>캠핑장이름</td>
              <td>날짜</td>
            </tr>
            <tr>
              <th>사진</th>
              <td>캠핑장이름</td>
              <td>날짜</td>
            </tr>
          </div>
        </div>
        <div>
          <tr className={styles.bar}>
            <h1><CheckOutlined /></h1>
            <th>예약완료</th>
            <p>1  건</p>
          </tr>
          <div className={styles.card}>
            <tr>
              <th>사진</th>
              <td>캠핑장이름</td>
              <td>날짜</td>
            </tr>
          </div>
        </div>
        <div>
          <tr className={styles.bar}>
            <h1><HistoryOutlined /></h1>
            <th>지난 기록</th>
            <p>10  건</p>
          </tr>
          <div className={styles.list}>
            <tr>
              <th>캠핑장명</th>
              <th>주소</th>
              <th>날짜</th>
            </tr>
            <tr>
              <td>글램핑장</td>
              <td>서울특별시 서초구 서초대로77길 41, 4층 (서초동, 대동Ⅱ)</td>
              <td>2025-08-13 ~ 2025-08-15</td>
            </tr>
            <tr>
              <td>글램핑장</td>
              <td>서울특별시 서초구 서초대로77길 41, 4층 (서초동, 대동Ⅱ)</td>
              <td>2025-08-13 ~ 2025-08-15</td>
            </tr>
            <tr>
              <td>글램핑장</td>
              <td>서울특별시 서초구 서초대로77길 41, 4층 (서초동, 대동Ⅱ)</td>
              <td>2025-08-13 ~ 2025-08-15</td>
            </tr>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReserveList