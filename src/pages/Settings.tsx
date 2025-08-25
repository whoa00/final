import React, { useState } from 'react';
import {Typography,Layout,Card,Row,Col,Button,List,Tag,Space,Table,TableProps,Modal} from 'antd';
import { PlusOutlined, CheckOutlined, CloseOutlined, DollarOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

// --- TypeScript Interfaces for Data ---
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

// Mock data for demonstration
const initialProperties: Property[] = [
  { id: 1, name: 'Cozy Mountain Cabin', address: '123 Pine St, Mountainville, CO' },
  { id: 2, name: 'Sunny Beach House', address: '456 Ocean Ave, Beachfront, FL' },
];

const initialBookings: Booking[] = [
  { id: 101, guestName: 'John Doe', property: 'Cozy Mountain Cabin', checkIn: '2024-11-10', checkOut: '2024-11-15', status: 'Confirmed', price: 500 },
  { id: 102, guestName: 'Jane Smith', property: 'Sunny Beach House', checkIn: '2024-12-01', checkOut: '2024-12-05', status: 'Confirmed', price: 800 },
];

const initialRequests: Request[] = [
  { id: 201, guestName: 'Michael Brown', property: 'Cozy Mountain Cabin', checkIn: '2025-01-20', checkOut: '2025-01-25' },
  { id: 202, guestName: 'Emily White', property: 'Sunny Beach House', checkIn: '2024-12-20', checkOut: '2024-12-28' },
];

const Settings: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [requests, setRequests] = useState<Request[]>(initialRequests);



  const totalEarnings = bookings.reduce((sum, b) => sum + b.price, 0);
  const totalGuests = bookings.length;
  const totalProperties = properties.length;


  const handleAcceptRequest = (id: number) => {
    const req = requests.find(r => r.id === id);
    if (!req) return;
    const newBooking: Booking = {
      ...req,
      status: 'Confirmed',
      price: 650,
      id: Math.max(...bookings.map(b => b.id), 100) + 1,
    };
    setBookings([...bookings, newBooking]);
    setRequests(requests.filter(r => r.id !== id));
    alert(`Booking for ${req.guestName} confirmed!`);
  };

  const handleDenyRequest = (id: number) => {
    if (window.confirm('Are you sure you want to deny this request?')) {
      setRequests(requests.filter(r => r.id !== id));
      alert('Request denied.');
    }
  };

  // --- Columns for Bookings Table ---
  const bookingColumns: TableProps<Booking>['columns'] = [
    {
      title: 'Guest Name',
      dataIndex: 'guestName',
      key: 'guestName',
    },
    {
      title: 'Property',
      dataIndex: 'property',
      key: 'property',
    },
    {
      title: 'Dates',
      key: 'dates',
      render: (_, record: Booking) => (
        <Space>
          <Tag color="geekblue">{moment(record.checkIn).format('MMM DD, YYYY')}</Tag>
          to
          <Tag color="geekblue">{moment(record.checkOut).format('MMM DD, YYYY')}</Tag>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => <Tag color="green">{status}</Tag>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
    }
  ];

  return (
    <Layout className="site-layout p-6" style={{ minHeight: '100vh' }}>
      <Content>
        <Title level={2}>Host Dashboard</Title>
        <Paragraph>Manage your properties, bookings, and requests all in one place.</Paragraph>

        {/* Analytics Section at the top */}
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card title="Host Analytics">
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={8}>
                  <Card bordered={false} className="text-center bg-gray-50">
                    <DollarOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                    <Title level={4} className="my-2">${totalEarnings}</Title>
                    <Paragraph>Total Earnings</Paragraph>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card bordered={false} className="text-center bg-gray-50">
                    <UserOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                    <Title level={4} className="my-2">{totalGuests}</Title>
                    <Paragraph>Total Guests</Paragraph>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card bordered={false} className="text-center bg-gray-50">
                    <HomeOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                    <Title level={4} className="my-2">{totalProperties}</Title>
                    <Paragraph>Total Properties</Paragraph>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Action Modules section */}
        <Row gutter={[24, 24]} className="mt-6">
          {/* Left half: Pending Booking Requests */}
          <Col xs={24} lg={12}>
            <Card title="Pending Booking Requests" className="h-full">
              <List
                itemLayout="horizontal"
                dataSource={requests}
                locale={{ emptyText: 'No pending requests' }}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    actions={[
                      <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        onClick={() => handleAcceptRequest(item.id)}
                      >
                        Accept
                      </Button>,
                      <Button
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => handleDenyRequest(item.id)}
                      >
                        Deny
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`Request from ${item.guestName}`}
                      description={
                        <Space direction="vertical">
                          <span>Property: {item.property}</span>
                          <span>Dates: {moment(item.checkIn).format('MMM DD')} - {moment(item.checkOut).format('MMM DD')}</span>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Right half: All Confirmed Bookings */}
          <Col xs={24} lg={12}>
            <Card title="All Confirmed Bookings" className="h-full">
              <Table
                columns={bookingColumns}
                dataSource={bookings}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: 'No confirmed bookings' }}
              />
            </Card>
          </Col>
        </Row>

        {/* New Full-width Property Overview section */}
        <Row gutter={[24, 24]} className="mt-6">
          <Col span={24}>
            <Card title="Property Overview" className="h-full">
              <List
                itemLayout="horizontal"
                dataSource={properties}
                locale={{ emptyText: 'No properties registered' }}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      title={item.name}
                      description={<Text type="secondary">{item.address}</Text>}
                    />
                  </List.Item>
                )}
              />
              <Button
                type="primary"
                href="/host/register" // This links to the new registration page
                icon={<PlusOutlined />}
                block
                className="mt-4"
              >
                Register a New Property
              </Button>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Settings;