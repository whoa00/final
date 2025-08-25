import React, { useState, useEffect } from 'react';
import { testVzeroConnection, createVzeroToken, processVzeroPayment } from '../lib/vzero';
import styles from '../styles/vzero.module.css';

interface VzeroPaymentProps {
  amount: number;
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
}

const VzeroPayment: React.FC<VzeroPaymentProps> = ({ amount, onSuccess, onError }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  useEffect(() => {
    // 컴포넌트 마운트 시 vzero 연결 테스트
    checkVzeroConnection();
  }, []);

  const checkVzeroConnection = async () => {
    const connected = await testVzeroConnection();
    setIsConnected(connected);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. vzero 토큰 생성
      const tokenData = {
        card: {
          number: paymentData.cardNumber,
          expirationMonth: paymentData.expiryMonth,
          expirationYear: paymentData.expiryYear,
          cvv: paymentData.cvv,
        },
      };

      const token = await createVzeroToken(tokenData);

      // 2. 결제 처리
      const paymentRequest = {
        amount: amount,
        paymentMethodToken: token.token,
        currency: 'KRW',
        description: '캠핑장 예약 결제',
      };

      const result = await processVzeroPayment(paymentRequest);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      alert('결제가 성공적으로 완료되었습니다!');
    } catch (error) {
      console.error('결제 처리 중 오류:', error);
      if (onError) {
        onError(error);
      }
      alert('결제 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className={styles.vzeroPayment}>
        <h3>vzero 결제</h3>
        <div className={`${styles.connectionStatus} ${styles.disconnected}`}>
          vzero 서비스에 연결할 수 없습니다. 설정을 확인해주세요.
        </div>
        <button onClick={checkVzeroConnection}>연결 재시도</button>
      </div>
    );
  }

  return (
    <div className={styles.vzeroPayment}>
      <h3>vzero 결제</h3>
      <div className={`${styles.connectionStatus} ${styles.connected}`}>
        vzero 서비스에 연결되었습니다.
      </div>
      <p>결제 금액: {amount.toLocaleString()}원</p>
      
      <form onSubmit={handlePayment}>
        <div className={styles.formGroup}>
          <label>카드 번호:</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleInputChange}
            placeholder="1234-5678-9012-3456"
            required
          />
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>만료 월:</label>
            <input
              type="text"
              name="expiryMonth"
              value={paymentData.expiryMonth}
              onChange={handleInputChange}
              placeholder="MM"
              maxLength={2}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>만료 년:</label>
            <input
              type="text"
              name="expiryYear"
              value={paymentData.expiryYear}
              onChange={handleInputChange}
              placeholder="YYYY"
              maxLength={4}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>CVV:</label>
            <input
              type="text"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              maxLength={4}
              required
            />
          </div>
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? '결제 처리 중...' : '결제하기'}
        </button>
      </form>
    </div>
  );
};

export default VzeroPayment;
