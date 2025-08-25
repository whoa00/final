import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Typography, Spin, Alert, } from 'antd';

const { Title, Paragraph: AntParagraph } = Typography;

interface Campsite {
  id: number;
  slug: string;
  name: string;
  location: string;
  nightlyPrice: number;
  images: string[];
  categorySlug: string;
  description: string;
}

const campsitesData: Campsite[] = [
  {
    id: 1,
    slug: '힐링 숲속 캠핑장',
    name: '힐링 숲속 캠핑장',
    location: '강원특별자치도 평창군 용평면 새이들길 14-7',
    nightlyPrice: 50000,
    images: ['/img/1.jpg'],
    categorySlug: '글램핑',
    description: '강 앞에 위치한 아름다운 캠핑장입니다',
  },
  {
    id: 2,
    slug: '호반 글램핑',
    name: '호반 글램핑',
    location: '강원도 홍천군 서면 한서길 45-9',
    nightlyPrice: 55000,
    images: ['/img/2.jpg'],
    categorySlug: '글램핑',
    description: '강변에 위치한 글램핑 캠핑장으로 자연 속에서 편안한 휴식을 즐기실 수 있습니다.',
  },
  {
    id: 3,
    slug: '산속 글램핑',
    name: '산속 글램핑',
    location: '강원도 평창군 봉평면 흥정로 78',
    nightlyPrice: 60000,
    images: ['/img/3.jpg'],
    categorySlug: '글램핑',
    description: '숲과 산으로 둘러싸인 캠핑장으로 트레킹과 휴식을 동시에 즐길 수 있는 최고의 장소입니다.',
  },
];

const DestinationList: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [filteredCampsites, setFilteredCampsites] = useState<Campsite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (!categorySlug) {
      setError('잘못된 카테고리입니다.');
      setLoading(false);
      return;
    }

    const filtered = campsitesData.filter(c => c.categorySlug === categorySlug);

    if (filtered.length === 0) {
      setError('해당 카테고리에 캠핑장이 없습니다.');
    }

    setFilteredCampsites(filtered);
    setLoading(false);
  }, [categorySlug]);

  if (loading) return <Spin style={{ margin: '50px auto', display: 'block' }} size="large" />;
  if (error) return <Alert type="error" message="에러" description={error} style={{ maxWidth: 600, margin: '30px auto' }} />;

  return (
    <div style={{ padding: 30, maxWidth: 1200, margin: '0 auto' }}>
      <Title level={2} style={{ marginBottom: 30, textTransform: 'capitalize' }}>
        {categorySlug?.replace(/-/g, ' ')}
      </Title>
      <Row gutter={[24, 24]}>
        {filteredCampsites.map(campsite => (
          <Col key={campsite.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={campsite.name} src={campsite.images[0]} style={{ borderRadius: 12, height: 180, objectFit: 'cover' }} />}
              onClick={() => navigate(`/campsite/${campsite.slug}`)}
              style={{ height: '100%' }}
            >
              <Card.Meta
                title={campsite.name}
                description={
                  <div style={{ height: 130, overflow: 'hidden' }}>
                    <AntParagraph ellipsis={{ rows: 4 }}>{campsite.description}</AntParagraph>
                    <div style={{ marginTop: 8 }}>₩{campsite.nightlyPrice.toLocaleString()} / 박</div>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DestinationList;
