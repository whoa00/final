import React, { useState } from 'react';
import {
  Typography,
  Layout,
  Card,
  Row,
  Col,
  Button,
  List,
  Tag,
  Space,
  Table,
  TableProps,
} from 'antd';
import { CheckOutlined, CloseOutlined, DollarOutlined, HomeOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

// --- TypeScript Interfaces for Data ---
interface PropertyRequest {
  id: number;
  hostName: string;
  propertyName: string;
  address: string;
}

interface Booking {
  id: number;
  guestName: string;
  property: string;
  hostName: string;
  checkIn: string;
  checkOut: string;
  price: number;
}

// Mock data for demonstration
const initialPropertyRequests: PropertyRequest[] = [
  { id: 1, hostName: 'Jessica', propertyName: 'Luxury Downtown Loft', address: '789 Central Blvd, Cityville, NY' },
  { id: 2, hostName: 'Tom', propertyName: 'Rustic Country House', address: '101 Farm Rd, Countryside, CA' },
];

const initialAllBookings: Booking[] = [
  { id: 101, guestName: 'John Doe', property: 'Cozy Mountain Cabin', hostName: 'Host A', checkIn: '2024-11-10', checkOut: '2024-11-15', price: 500 },
  { id: 102, guestName: 'Jane Smith', property: 'Sunny Beach House', hostName: 'Host B', checkIn: '2024-12-01', checkOut: '2024-12-05', price: 800 },
  { id: 103, guestName: 'Michael Brown', property: 'Luxury Downtown Loft', hostName: 'Host C', checkIn: '2025-01-20', checkOut: '2025-01-25', price: 650 },
  { id: 104, guestName: 'Emily White', property: 'Cozy Mountain Cabin', hostName: 'Host A', checkIn: '2024-12-20', checkOut: '2024-12-28', price: 920 },
];

const Projects: React.FC = () => {
  const [propertyRequests, setPropertyRequests] = useState<PropertyRequest[]>(initialPropertyRequests);
  const [allBookings] = useState<Booking[]>(initialAllBookings);

  // --- Analytics Calculations ---
  const totalEarnings = allBookings.reduce((sum, booking) => sum + booking.price, 0);
  const totalBookings = allBookings.length;
  const totalProperties = new Set(allBookings.map(b => b.property)).size;

  // --- Handlers for Property Requests using window.confirm() and alert() as requested ---
  const handleAcceptRequest = (request: PropertyRequest) => {
    // Use window.confirm() to get user confirmation.
    if (window.confirm(`Are you sure you want to accept the request for "${request.propertyName}"?`)) {
      // If the user confirms, update the state to remove the request.
      setPropertyRequests(prevRequests => prevRequests.filter(req => req.id !== request.id));
      // Use alert() to provide feedback.
      alert(`The request for "${request.propertyName}" has been accepted.`);
    }
  };

  const handleDenyRequest = (request: PropertyRequest) => {
    // Use window.confirm() to get user confirmation.
    if (window.confirm(`Are you sure you want to deny the request for "${request.propertyName}"? This action cannot be undone.`)) {
      // If the user confirms, update the state to remove the request.
      setPropertyRequests(prevRequests => prevRequests.filter(req => req.id !== request.id));
      // Use alert() to provide feedback.
      alert(`The request for "${request.propertyName}" has been denied.`);
    }
  };

  // --- Columns for All Bookings Table ---
  const bookingColumns: TableProps<Booking>['columns'] = [
    {
      title: 'Guest',
      dataIndex: 'guestName',
      key: 'guestName',
      ellipsis: true,
      width: '20%', // Relative width for better responsiveness
    },
    {
      title: 'Property',
      dataIndex: 'property',
      key: 'property',
      ellipsis: true,
      width: '20%',
    },
    {
      title: 'Host',
      dataIndex: 'hostName',
      key: 'hostName',
      ellipsis: true,
      width: '20%',
    },
    {
      title: 'Dates',
      key: 'dates',
      render: (_, record: Booking) => (
        <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <Tag color="geekblue">{moment(record.checkIn).format('MMM DD, YYYY')}</Tag>
          <span style={{ margin: '0 4px' }}>to</span>
          <Tag color="geekblue">{moment(record.checkOut).format('MMM DD, YYYY')}</Tag>
        </div>
      ),
      width: '30%', // Reduced from implied 250px to a relative width
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <span>${price}</span>,
      width: '10%', // Allocate sufficient space for price
      fixed: 'right', // Fix price column to the right for visibility
    },
  ];

  return (
    <Layout className="site-layout p-6" style={{ minHeight: '100vh' }}>
      <Content>
        <Title level={2}>Admin Dashboard</Title>
        <Paragraph>Manage property requests and view global booking data.</Paragraph>

        {/* Admin Analytics Section */}
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card title="Global Analytics">
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={8}>
                  <Card bordered={false} className="text-center bg-gray-50">
                    <DollarOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                    <Title level={4} className="my-2">${totalEarnings}</Title>
                    <Paragraph>Total Platform Earnings</Paragraph>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card bordered={false} className="text-center bg-gray-50">
                    <HomeOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                    <Title level={4} className="my-2">{totalProperties}</Title>
                    <Paragraph>Total Active Properties</Paragraph>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card bordered={false} className="text-center bg-gray-50">
                    <CheckOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                    <Title level={4} className="my-2">{totalBookings}</Title>
                    <Paragraph>Total Bookings</Paragraph>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Main Content Sections */}
        <Row gutter={[24, 24]} className="mt-6">
          {/* Left half: Pending Property Requests */}
          <Col xs={24} lg={12}>
            <Card title="Pending Property Requests" className="h-full">
              <List
                itemLayout="horizontal"
                dataSource={propertyRequests}
                locale={{ emptyText: 'No pending property requests' }}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    actions={[
                      <Button
                        type="primary"
                        icon={<CheckOutlined />}
                        onClick={() => handleAcceptRequest(item)}
                      >
                        Accept
                      </Button>,
                      <Button
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => handleDenyRequest(item)}
                      >
                        Deny
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`Request from Host: ${item.hostName}`}
                      description={
                        <Space direction="vertical">
                          <span>Property: {item.propertyName}</span>
                          <span>Address: {item.address}</span>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Right half: All Bookings */}
          <Col xs={24} lg={12}>
            <Card title="All Bookings" className="h-full">
              <Table
                columns={bookingColumns}
                dataSource={allBookings}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: 'No bookings found' }}
                scroll={{ x: 'max-content' }} // Enable horizontal scrolling for smaller screens
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Projects;
