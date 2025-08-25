import React from 'react'
import {LoadingOutlined} from '@ant-design/icons';

const PointDetail: React.FC = () => {
  return (
    <form>
      <div>
        <h2>My Point</h2>
        <tr>현재 포인트 잔액 : 500 P</tr>
      </div>
      <div>
        <h2>포인트 충전 요청</h2>
        <div>
          <td>금액</td>
          <input type="number" />
          <p>충전될 포인트 : ??? P</p>
        </div>
        <tr>
            <h1><LoadingOutlined /></h1>
            <td>충전 대기 포인트</td>
          <div>  
            <tr>
              <td>날짜</td>
              <td>충전할 포인트</td>
              <td>결제된 금액</td>
            </tr>
          </div>
        </tr>
      </div>
    </form>
  )
}

export default PointDetail