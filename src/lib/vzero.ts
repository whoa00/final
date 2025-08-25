// vzero 설정 및 연결
import axios from 'axios';

// vzero API 설정
export const vzeroConfig = {
  baseURL: process.env.REACT_APP_VZERO_BASE_URL || 'https://api.vzero.com',
  apiKey: process.env.REACT_APP_VZERO_API_KEY,
  secretKey: process.env.REACT_APP_VZERO_SECRET_KEY,
};

// vzero API 클라이언트 생성
export const vzeroApi = axios.create({
  baseURL: vzeroConfig.baseURL,
  headers: {
    'Authorization': `Bearer ${vzeroConfig.apiKey}`,
    'Content-Type': 'application/json',
  },
});

// vzero 연결 테스트
export const testVzeroConnection = async () => {
  try {
    const response = await vzeroApi.get('/health');
    console.log('vzero 연결 성공:', response.data);
    return true;
  } catch (error) {
    console.error('vzero 연결 실패:', error);
    return false;
  }
};

// vzero 인증 토큰 생성
export const createVzeroToken = async (data: any) => {
  try {
    const response = await vzeroApi.post('/tokens', data);
    return response.data;
  } catch (error) {
    console.error('vzero 토큰 생성 실패:', error);
    throw error;
  }
};

// vzero 결제 처리
export const processVzeroPayment = async (paymentData: any) => {
  try {
    const response = await vzeroApi.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    console.error('vzero 결제 처리 실패:', error);
    throw error;
  }
};
