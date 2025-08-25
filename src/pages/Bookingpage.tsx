import React, { useState } from "react";
import {
  Typography,
  Divider,
  Button,
  Card,
  Form,
  Input,
  Select,
  message,
  Steps,
  DatePicker,
  Modal,
} from "antd";
import locale from "antd/es/date-picker/locale/ko_KR";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Step } = Steps;
const { RangePicker } = DatePicker;

const BookingStepsWithPointsModal: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // 더미 캠핑장 데이터
  const campsite = {
    name: "힐링 숲속 캠핑장",
    location: "강원특별자치도 평창군 용평면 새이들길 14-7",
    nightlyPrice: 80000,
    cleaningFee: 20000,
  };

  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs().add(1, "day"),
    dayjs().add(3, "day"),
  ]);
  const [guests, setGuests] = useState(2);
  const [userInfo, setUserInfo] = useState({ name: "", phone: "", email: "" });

  const nights =
    dates[0] && dates[1] ? dates[1].diff(dates[0], "day") : 0;
  const serviceFee = 10000;
  const total =
    campsite.nightlyPrice * nights + campsite.cleaningFee + serviceFee;

  // 더미 사용자 포인트
  const [userPoints, setUserPoints] = useState(2000000); // 부족한 예시

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleFinish = () => {
    if (userPoints >= total) {
      message.success("예약이 완료되었습니다! 포인트가 차감되었습니다. (더미)");
      setUserPoints(userPoints - total); // 포인트 차감
      nextStep();
    } else {
      // 포인트 부족 → 모달 표시
      setModalVisible(true);
    }
  };

  const handleModalOk = () => {
    setModalVisible(false);
    navigate("/points-charge"); // 포인트 충전 페이지로 이동
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 30 }}>
      <Title level={2}>{campsite.name} 예약 / 결제</Title>
      <Text type="secondary">{campsite.location}</Text>

      <Divider />

      <Steps current={currentStep} style={{ marginBottom: 30 }}>
        <Step title="예약 정보" />
        <Step title="예약자 정보" />
        <Step title="결제" />
        <Step title="완료" />
      </Steps>

      {/* Step Content */}
      {currentStep === 0 && (
        <Card>
          <Title level={4}>예약 정보 선택</Title>
          <Divider />
          <Form layout="vertical">
            <Form.Item label="체크인 / 체크아웃">
              <RangePicker
                locale={locale}
                value={dates}
                onChange={(val) =>
                  setDates(val as [Dayjs | null, Dayjs | null])
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="인원">
              <Select value={guests} onChange={(val) => setGuests(val)}>
                {[1, 2, 3, 4].map((n) => (
                  <Select.Option key={n} value={n}>
                    성인 {n}명
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <Button type="primary" onClick={nextStep} disabled={nights <= 0}>
              다음
            </Button>
          </div>
        </Card>
      )}

      {currentStep === 1 && (
        <Card>
          <Title level={4}>예약자 정보 입력</Title>
          <Divider />
          <Form layout="vertical">
            <Form.Item label="이름">
              <Input
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="연락처">
              <Input
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="이메일">
              <Input
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
            </Form.Item>
          </Form>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
            <Button onClick={prevStep}>뒤로</Button>
            <Button type="primary" onClick={nextStep}>
              다음
            </Button>
          </div>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <Title level={4}>결제 확인 (포인트 사용)</Title>
          <Divider />
          <Text>사용자 포인트: ₩{userPoints.toLocaleString()}</Text>
          <Divider />
          <Title level={5}>금액 내역</Title>
          <p>
            1박 요금 × {nights}박: ₩
            {(campsite.nightlyPrice * nights).toLocaleString()}
          </p>
          <p>청소비: ₩{campsite.cleaningFee.toLocaleString()}</p>
          <p>서비스 수수료: ₩{serviceFee.toLocaleString()}</p>
          <Divider />
          <Title level={4}>총액: ₩{total.toLocaleString()}</Title>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
            <Button onClick={prevStep}>뒤로</Button>
            <Button type="primary" onClick={handleFinish}>
              포인트로 결제
            </Button>
          </div>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <Title level={3}>예약 완료!</Title>
          <Text>예약이 정상적으로 완료되었습니다. 감사합니다!</Text>
          <Divider />
          <Title level={4}>예약 정보</Title>
          <p>캠핑장: {campsite.name}</p>
          <p>
            체크인: {dates[0]?.format("YYYY-MM-DD")}, 체크아웃:{" "}
            {dates[1]?.format("YYYY-MM-DD")}
          </p>
          <p>인원: {guests}명</p>
          <p>총액: ₩{total.toLocaleString()}</p>
          <p>차감된 포인트: ₩{total.toLocaleString()}</p>
          <p>남은 포인트: ₩{(userPoints - total).toLocaleString()}</p>
          <Button
            type="primary"
            style={{ marginTop: 16 }}
            onClick={() => setCurrentStep(0)}
          >
            마이페이지
          </Button>
        </Card>
      )}

      {/* 포인트 부족 모달 */}
      <Modal
        title="포인트 부족"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        okText="포인트 충전하기"
        cancelText="취소"
      >
        <p>포인트가 부족합니다. 포인트를 충전하시겠습니까?</p>
      </Modal>
    </div>
  );
};

export default BookingStepsWithPointsModal;
