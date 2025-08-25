import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DatePicker, Select, Button, Divider, Typography, Image, Spin, Alert, Tag } from 'antd';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ko_KR';

const { RangePicker } = DatePicker;
const { Text, Title, Paragraph } = Typography;

interface Campsite {
    id: number;
    slug: string;
    name: string;
    location: string;
    description: string;
    nightlyPrice: number;
    cleaningFee: number;
    images: string[];
    amenities: string[];
    tags: string[]; // ✅ 태그 필드 추가
}

const CampsiteDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [campsite, setCampsite] = useState<Campsite | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [dates, setDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([
        dayjs().add(1, 'day'),
        dayjs().add(3, 'day'),
    ]);
    const [guests, setGuests] = useState('성인 1명');

    useEffect(() => {
        if (!slug) {
            setError('잘못된 캠핑장 주소입니다.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        // 더미 캠핑장 데이터
        const campsites: Campsite[] = [
            {
                id: 1,
                slug: '힐링 숲속 캠핑장',
                name: '힐링 숲속 캠핑장',
                location: ' 강원특별자치도 평창군 용평면 새이들길 14-7',
                description: '맑고 푸른 강가에 위치한 캠핑장으로, 잔잔한 물결 소리와 함께 여유로운 시간을 즐기실 수 있습니다. 넓은 잔디밭과 깨끗한 시설이 마련되어 있어 가족 단위 여행객들에게 특히 추천드리며, 일몰 시간에는 아름다운 노을을 감상할 수 있는 최고의 장소입니다.',
                nightlyPrice: 50000,
                cleaningFee: 12000,
                images: [
                    '/img/1.jpg',
                    '/img/2.jpg',
                    '/img/3.jpg',
                ],
                amenities: ['무료 Wi-Fi', '주차 가능', '화덕', '화장실'],
                tags: ['강 전망', '가족 추천', '조용한 분위기'],
            }
            ,
            {
                id: 2,
                slug: 'mountain-camp1',
                name: 'Mountain Camp A',
                location: 'Mountain Peak',
                description: '웅장한 산맥의 정취를 가까이에서 느낄 수 있는 캠핑장으로, 신선한 공기와 맑은 하늘이 매력적인 공간입니다. 아침에는 새소리와 함께 상쾌한 하루를 시작할 수 있으며, 낮에는 등산과 트레킹을 통해 자연 속 액티비티를 만끽하실 수 있습니다. 별빛 가득한 밤하늘 아래에서는 잊지 못할 추억을 남기실 수 있습니다.',
                nightlyPrice: 60000,
                cleaningFee: 15000,
                images: [
                    'https://placehold.co/600x400/8B4513/FFFFFF?text=Mountain+Camp+A+Main',
                    'https://placehold.co/600x400/8B4513/FFFFFF?text=Mountain+Camp+A+1',
                    'https://placehold.co/600x400/8B4513/FFFFFF?text=Mountain+Camp+A+2',
                ],
                amenities: ['전기', '주차 가능', '화장실', '바베큐장'],
                tags: ['산악 캠핑', '등산 최적지', '액티비티 중심'],
            },
        ];


        const found = campsites.find((c) => c.slug === slug);
        if (!found) {
            setError('해당 캠핑장을 찾을 수 없습니다.');
            setLoading(false);
            return;
        }

        setCampsite(found);
        setLoading(false);
    }, [slug]);

    if (loading)
        return <Spin style={{ margin: '50px auto', display: 'block' }} size="large" />;

    if (error)
        return (
            <Alert
                message="에러"
                description={error}
                type="error"
                showIcon
                style={{ maxWidth: 600, margin: '30px auto' }}
            />
        );

    if (!campsite) return <div>캠핑장 정보를 찾을 수 없습니다.</div>;

    const nights = dates[0] && dates[1] ? dates[1].diff(dates[0], 'day') : 0;
    const total = campsite.nightlyPrice * nights + (nights > 0 ? campsite.cleaningFee : 0);

    return (
        <div style={{ padding: 30, maxWidth: 1200, margin: '0 auto' }}>
            <Title level={2}>{campsite.name}</Title>
            <Text type="secondary">{campsite.location}</Text>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 5, marginTop: 20, marginBottom: 10 }}>
                <Image src={campsite.images[0]} alt="main" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
                <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 5 }}>
                    {campsite.images.slice(1, 3).map((img, idx) => (
                        <Image key={idx} src={img} alt={`sub${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
                    ))}
                </div>
            </div>

            {/* ✅ 태그를 사진 아래에 표시 */}
            <div style={{ margin: '10px 0 30px 0' }}>
                {campsite.tags.map((tag, idx) => (
                    <Tag key={idx} color="blue">{tag}</Tag>
                ))}
            </div>

            <div style={{ display: 'flex', gap: 40 }}>
                <div style={{ flex: 2 }}>
                    <Title level={4}>캠핑장 소개</Title>
                    <Paragraph>{campsite.description}</Paragraph>

                    <Title level={4} style={{ marginTop: 30 }}>편의시설</Title>
                    <ul>
                        {campsite.amenities.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div style={{ flex: '0 0 320px', border: '1px solid #ddd', borderRadius: 12, padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                        <Text strong style={{ fontSize: '1.2rem' }}>₩{campsite.nightlyPrice.toLocaleString()}</Text>
                        <Text>/박</Text>
                    </div>

                    <RangePicker locale={locale} value={dates} onChange={(val) => setDates(val as any)} style={{ width: '100%', marginTop: 10 }} />

                    <Select
                        value={guests}
                        onChange={(val) => setGuests(val)}
                        style={{ width: '100%', marginTop: 10 }}
                        options={[
                            { value: '성인 1명', label: '성인 1명' },
                            { value: '성인 2명', label: '성인 2명' },
                            { value: '성인 3명', label: '성인 3명' },
                        ]}
                    />

                    <Button
                        type="primary"
                        size="large"
                        block
                        style={{ marginTop: 15 }}
                        onClick={() => navigate(`/booking/${slug}`, { state: { campsite, dates, guests } })}
                    >
                        예약하기
                    </Button>

                    {nights > 0 && (
                        <div style={{ marginTop: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{nights}박 x ₩{campsite.nightlyPrice.toLocaleString()}</span>
                                <span>₩{(campsite.nightlyPrice * nights).toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>청소비</span>
                                <span>₩{campsite.cleaningFee.toLocaleString()}</span>
                            </div>
                            <Divider />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text strong>총액</Text>
                                <Text strong>₩{total.toLocaleString()}</Text>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CampsiteDetail;
