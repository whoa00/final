import React from 'react';
import { Typography, Input, Button, Card, Row, Col, DatePicker, Select } from 'antd';
import { SearchOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/home.module.css';
 
const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
 
const Home: React.FC = () => {
  const navigate = useNavigate();
 
  const onSearch = (values: any) => {
    console.log('검색 실행:', values);
  };
 
  const featuredDestinations = [
    { title: '오토캠핑', description: '차박을 즐겨보세요', imageUrl: '/img/autocamp.png'},
    { title: '글램핑', description: '편한 캠핑을 원하신다면 글램핑', imageUrl: '/img/gram.png' },
    { title: '애견캠핑', description: '반려견과 함께하는 캠핑', imageUrl: '/img/dogcamp.png' },
    { title: '키즈캠핑', description: '아이들과 함께하는 액티비티한 캠핑', imageUrl: '/img/kizcamp.png' },
  ];
 
  // 제목 → slug 변환
  const toSlug = (title: string) =>
    title.toLowerCase().replace(/\s+/g, '-');
 
  const howItWorks = [
    { icon: <SearchOutlined />, title: '찾기', description: '수천 개의 독특한 캠핑지를 검색하세요.' },
    { icon: <CalendarOutlined />, title: '예약', description: '간편한 온라인 예약과 결제.' },
    { icon: <EnvironmentOutlined />, title: '체험', description: '당신만의 완벽한 여행을 즐기세요.' },
  ];
 
  return (
    <div className={styles.homePageCampspotStyle}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <Title level={1} className={styles.heroTitle}>
            당신의 완벽한 캠핑지를 찾아보세요.
          </Title>
          <Paragraph className={styles.heroSubtitle}>
            쉽고 편하게 특별한 야외 경험을 예약하세요.
          </Paragraph>
          <div className={styles.searchWidget}>
            <Input
              className={styles.searchField}
              placeholder="어디로 떠나고 싶으신가요?"
              prefix={<EnvironmentOutlined />}
              size="large"
            />
            <RangePicker
              className={styles.searchField}
              placeholder={['체크인', '체크아웃']}
              size="large"
            />
            <Select
              className={styles.searchField}
              placeholder="게스트 수"
              size="large"
              defaultValue="2"
            >
              <Option value="1">1명</Option>
              <Option value="2">2명</Option>
              <Option value="3">3명</Option>
              <Option value="4">4명 이상</Option>
            </Select>
            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              className={styles.searchButton}
              onClick={() => onSearch({ location: '예시', dates: '예시', guests: '예시' })}
            >
              검색
            </Button>
          </div>
        </div>
      </div>
 
      {/* Featured Destinations Section */}
      <div className={styles.sectionContainer}>
        <Title level={2} className={styles.sectionTitle}>
          추천 캠핑지
        </Title>
        <Row gutter={[24, 24]} justify="center">
          {featuredDestinations.map((destination, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className={styles.featureCard}
                cover={<img alt={destination.title} src={destination.imageUrl} className={styles.featureImage} />}
                onClick={() => navigate(`/destination/${toSlug(destination.title)}`)}
              >
                <Card.Meta
                  title={<Title level={4} className={styles.featureTitle}>{destination.title}</Title>}
                  description={<Paragraph className={styles.featureDescription}>{destination.description}</Paragraph>}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
 
      {/* How It Works Section */}
      <div className={`${styles.sectionContainer} ${styles.howItWorksSection}`}>
        <Title level={2} className={styles.sectionTitle}>
          예약 절차
        </Title>
        <Row gutter={[24, 24]} justify="center">
          {howItWorks.map((item, index) => (
            <Col key={index} xs={24} sm={8} md={8} lg={8}>
              <div className={styles.howItWorksItem}>
                <div className={styles.howItWorksIcon}>{item.icon}</div>
                <Title level={4} className={styles.howItWorksTitle}>{item.title}</Title>
                <Paragraph className={styles.howItWorksDescription}>{item.description}</Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      </div>
 
      {/* Call to Action Section */}
      <div className={`${styles.sectionContainer} ${styles.ctaSection}`}>
        <div className={styles.ctaContent}>
          <Title level={2} className={styles.ctaTitle}>
            다음 여행을 떠날 준비가 되셨나요?
          </Title>
          <Paragraph className={styles.ctaDescription}>
            수천 개의 독특한 캠핑지를 탐험하고 오늘 바로 예약하세요.
          </Paragraph>
          <Button type="primary" size="large" className={styles.ctaButton}>
            탐험 시작하기
          </Button>
        </div>
      </div>
    </div>
  )
}
 
export default Home;
 