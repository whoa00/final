import React, { useState } from 'react';
import VzeroPayment from '../components/VzeroPayment';

const VzeroTestPage: React.FC = () => {
  const [testAmount, setTestAmount] = useState(50000);

  const handlePaymentSuccess = (result: any) => {
    console.log('결제 성공:', result);
    // 여기에 성공 후 로직 추가 (예: 예약 완료 처리)
  };

  const handlePaymentError = (error: any) => {
    console.error('결제 실패:', error);
    // 여기에 실패 후 로직 추가 (예: 에러 처리)
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>vzero 결제 테스트</h1>
      <p>이 페이지는 vzero 결제 시스템과의 연동을 테스트하기 위한 페이지입니다.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          테스트 금액: 
          <input
            type="number"
            value={testAmount}
            onChange={(e) => setTestAmount(Number(e.target.value))}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
          원
        </label>
      </div>

      <VzeroPayment
        amount={testAmount}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>vzero 연결 설정 방법</h3>
        <ol>
          <li>프로젝트 루트에 <code>.env</code> 파일을 생성하세요.</li>
          <li>다음 환경 변수를 설정하세요:</li>
          <ul>
            <li><code>REACT_APP_VZERO_BASE_URL</code>: vzero API 기본 URL</li>
            <li><code>REACT_APP_VZERO_API_KEY</code>: vzero API 키</li>
            <li><code>REACT_APP_VZERO_SECRET_KEY</code>: vzero 시크릿 키</li>
          </ul>
          <li>vzero 서비스 제공업체로부터 API 키를 발급받으세요.</li>
          <li>애플리케이션을 재시작하세요.</li>
        </ol>
      </div>
    </div>
  );
};

export default VzeroTestPage;
