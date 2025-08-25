import React, { useState } from 'react';
import { Typography, Layout, Card, Row, Col, Button, List, Tag, Space, Table, TableProps, Modal, Rate } from 'antd';
import { PlusOutlined, CheckOutlined, CloseOutlined, DollarOutlined, UserOutlined, HomeOutlined, CommentOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

// --- TypeScript Interfaces ---
interface Property {
  id: number;
  name: string;
  address: string;
}

interface Booking {
  id: number;
  guestName: string;
  property: string;
  checkIn: string;
  checkOut: string;
  status: 'Confirmed' | 'Pending';
  price: number;
}

interface Request {
  id: number;
  guestName: string;
  property: string;
  checkIn: string;
  checkOut: string;
}

interface Sensor {
  id: number;
  temperature: number;
  humidity: number;
}

interface SensorData {
  propertyId: number;
  sensors: Sensor[];
}

interface Review {
  id: number;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
}

// --- 더미 데이터 (한국식 이름/캠핑장) ---
const initialProperties: Property[] = [
  { id: 1, name: '아늑한 산장', address: '서울시 강남구 산1길 123' },
  { id: 2, name: '햇살 가득 해변집', address: '부산시 해운대구 해변로 456' },
  { id: 3, name: '숲속 휴양지', address: '강원도 평창군 숲길 789' },
];

const initialBookings: Booking[] = [
  { id: 101, guestName: '홍길동', property: '아늑한 산장', checkIn: '2024-11-10', checkOut: '2024-11-15', status: 'Confirmed', price: 500000 },
  { id: 102, guestName: '김영희', property: '햇살 가득 해변집', checkIn: '2024-12-01', checkOut: '2024-12-05', status: 'Confirmed', price: 800000 },
];

const initialRequests: Request[] = [
  { id: 201, guestName: '박철수', property: '아늑한 산장', checkIn: '2025-01-20', checkOut: '2025-01-25' },
  { id: 202, guestName: '이민정', property: '햇살 가득 해변집', checkIn: '2024-12-20', checkOut: '2024-12-28' },
];

// --- 센서 데이터 더미 ---
const initialSensorData: SensorData[] = [
  {
    propertyId: 1,
    sensors: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, temperature: 22 + i % 3, humidity: 50 + i % 6 })),
  },
  {
    propertyId: 2,
    sensors: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, temperature: 27 + i % 3, humidity: 60 + i % 6 })),
  },
  {
    propertyId: 3,
    sensors: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, temperature: 20 + i % 3, humidity: 45 + i % 6 })),
  },
];

// --- 리뷰 더미 데이터 ---
const reviewData: { [key: number]: Review[] } = {
  1: [
    { id: 1, guestName: '홍길동', rating: 4, comment: '아늑한 산장에서의 멋진 시간!', date: '2024-11-16' },
    { id: 2, guestName: '김민수', rating: 5, comment: '시설이 깨끗하고 경치가 훌륭했습니다.', date: '2024-11-20' },
  ],
  2: [
    { id: 3, guestName: '김영희', rating: 5, comment: '해변 근처라 너무 좋았어요!', date: '2024-12-06' },
  ],
  3: [
    { id: 4, guestName: '이정민', rating: 3, comment: '좋았지만 접근성이 조금 아쉬웠어요.', date: '2024-12-10' },
  ],
};

const HostDashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [sensorData, setSensorData] = useState<SensorData[]>(initialSensorData);
  const [expandedProperties, setExpandedProperties] = useState<number[]>([]);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const totalEarnings = bookings.reduce((sum, b) => sum + b.price, 0);
  const totalGuests = bookings.length;
  const totalProperties = properties.length;

  const handleAcceptRequest = (id: number) => {
    const req = requests.find(r => r.id === id);
    if (!req) return;
    const newBooking: Booking = {
      ...req,
      status: 'Confirmed',
      price: 650000,
      id: Math.max(...bookings.map(b => b.id), 100) + 1,
    };
    setBookings([...bookings, newBooking]);
    setRequests(requests.filter(r => r.id !== id));
    alert(`${req.guestName}님의 예약이 확정되었습니다!`);
  };

  const handleDenyRequest = (id: number) => {
    if (window.confirm('정말로 이 예약 요청을 거절하시겠습니까?')) {
      setRequests(requests.filter(r => r.id !== id));
      alert('예약 요청이 거절되었습니다.');
    }
  };

  const togglePropertySensors = (propertyId: number) => {
    setExpandedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleShowReviews = (property: Property) => {
    setSelectedProperty(property);
    setIsReviewModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsReviewModalVisible(false);
    setSelectedProperty(null);
  };

  const getAverageRating = (propertyId: number) => {
    const reviews = reviewData[propertyId] || [];
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const bookingColumns: TableProps<Booking>['columns'] = [
    { title: '게스트 이름', dataIndex: 'guestName', key: 'guestName', ellipsis: true, width: '20%' },
    { title: '캠핑장', dataIndex: 'property', key: 'property', ellipsis: true, width: '20%' },
    {
      title: '체크인/체크아웃',
      key: 'dates',
      render: (_, record: Booking) => (
        <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <Tag color="geekblue">{moment(record.checkIn).format('YYYY-MM-DD')}</Tag>
          <span style={{ margin: '0 4px' }}>~</span>
          <Tag color="geekblue">{moment(record.checkOut).format('YYYY-MM-DD')}</Tag>
        </div>
      ),
      width: '25%',
    },
    { title: '상태', key: 'status', dataIndex: 'status', render: (status: string) => <Tag color="green">{status === 'Confirmed' ? '확정' : '대기'}</Tag>, width: '15%' },
    { title: '가격', dataIndex: 'price', key: 'price', render: (price: number) => `${price.toLocaleString()}₩`, width: '15%', fixed: 'right' },
  ];

  return (
    <Layout className="site-layout p-6" style={{ minHeight: '100vh' }}>
      <Content>
        <Title level={2}>호스트 대시보드</Title>
        <Paragraph>캠핑장, 예약, 요청을 한 곳에서 관리하세요.</Paragraph>

        {/* Analytics */}
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card title="호스트 통계">
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={8}>
                  <Card bordered={false} className="text-center bg-gray-50">
                    <DollarOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                    <Title level={4} className="my-2">₩{totalEarnings.toLocaleString()}</Title>
                    <Paragraph>총 수익</Paragraph>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card bordered={false} className="text-center bg-gray-50">
                    <UserOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                    <Title level={4} className="my-2">{totalGuests}</Title>
                    <Paragraph>총 게스트</Paragraph>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card bordered={false} className="text-center bg-gray-50">
                    <HomeOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                    <Title level={4} className="my-2">{totalProperties}</Title>
                    <Paragraph>총 캠핑장</Paragraph>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Pending Requests & Confirmed Bookings */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="대기 중인 예약 요청" className="h-full">
              <List
                itemLayout="horizontal"
                dataSource={requests}
                locale={{ emptyText: '대기 중인 요청이 없습니다.' }}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    actions={[
                      <Button type="primary" icon={<CheckOutlined />} onClick={() => handleAcceptRequest(item.id)}>승인</Button>,
                      <Button danger icon={<CloseOutlined />} onClick={() => handleDenyRequest(item.id)}>거절</Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`${item.guestName}님의 요청`}
                      description={
                        <Space direction="vertical">
                          <span>캠핑장: {item.property}</span>
                          <span>체크인: {moment(item.checkIn).format('YYYY-MM-DD')} ~ 체크아웃: {moment(item.checkOut).format('YYYY-MM-DD')}</span>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="확정된 예약" className="h-full">
              <Table
                columns={bookingColumns}
                dataSource={bookings}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: '확정된 예약이 없습니다.' }}
                scroll={{ x: 'max-content' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Property Overview & Sensor Data */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="캠핑장 목록" className="h-full">
              <List
                itemLayout="horizontal"
                dataSource={properties}
                locale={{ emptyText: '등록된 캠핑장이 없습니다.' }}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    actions={[
                      <Space>
                        <Rate disabled allowHalf value={getAverageRating(item.id)} />
                        <Button type="default" icon={<CommentOutlined />} onClick={() => handleShowReviews(item)}>리뷰 관리</Button>
                      </Space>,
                    ]}
                  >
                    <List.Item.Meta
                      title={item.name}
                      description={<Text type="secondary">{item.address}</Text>}
                    />
                  </List.Item>
                )}
              />
              <Link to="/host/register">
                <Button type="primary" icon={<PlusOutlined />} block className="mt-4">
                  캠핑장 등록
                </Button>
              </Link>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="센서 데이터" className="h-full">
              {properties.map(p => {
                const sensors = sensorData.find(s => s.propertyId === p.id)?.sensors || [];
                const isExpanded = expandedProperties.includes(p.id);
                return (
                  <Card
                    key={p.id}
                    size="small"
                    type="inner"
                    title={p.name}
                    extra={
                      <Button type="link" onClick={() => togglePropertySensors(p.id)}>
                        {isExpanded ? '센서 숨기기' : '센서 보기'}
                      </Button>
                    }
                    className="mb-4"
                  >
                    {isExpanded && (
                      <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={sensors}
                        renderItem={(sensor) => (
                          <List.Item key={sensor.id}>
                            <Card size="small" type="inner" title={`센서 ${sensor.id}`}>
                              🌡 {sensor.temperature}°C <br /> 💧 {sensor.humidity}%
                            </Card>
                          </List.Item>
                        )}
                      />
                    )}
                  </Card>
                );
              })}
            </Card>
          </Col>
        </Row>

        {/* Review Modal */}
        <Modal
          title={`${selectedProperty?.name} 리뷰 관리`}
          open={isReviewModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="close" onClick={handleCloseModal}>닫기</Button>,
          ]}
        >
          <List
            itemLayout="horizontal"
            dataSource={selectedProperty ? reviewData[selectedProperty.id] || [] : []}
            locale={{ emptyText: '리뷰가 없습니다.' }}
            renderItem={(review) => (
              <List.Item key={review.id}>
                <List.Item.Meta
                  title={
                    <Space>
                      {review.guestName}
                      <Rate disabled allowHalf value={review.rating} />
                    </Space>
                  }
                  description={
                    <Space direction="vertical">
                      <Text>{review.comment}</Text>
                      <Text type="secondary">{moment(review.date).format('YYYY-MM-DD')}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Modal>
      </Content>
    </Layout>
  );
};

export default HostDashboard;