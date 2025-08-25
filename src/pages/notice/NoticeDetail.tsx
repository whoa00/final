import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import style from '../../styles/notice.module.css'
import { Typography, Layout as AntLayout, Button, Space, Pagination,Select } from 'antd'; 
    interface NoticeVO {
    num: number;
    title?: string;
    writer?: string;
    contents: string;
    hit: number;
}
    const { Title } = Typography;
const NoticeDetail: React.FC = () => {
    const [list, setList] = useState<NoticeVO | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    useEffect(() => {
        const detailServer = async () => {
            try {
                const resp = await axios.get<NoticeVO>(`http://192.168.0.35/blueteam/notice/detail?num=${id}`);
                setList(resp.data);
            } catch (error) {
                console.error('Error', error);
            }
        };
        detailServer();
    }, [id]);
    const handleDeleteClick = async () => {      
        try {
            await axios.get(`http://192.168.0.35/blueteam/notice/delete?num=${id}`);
            alert("삭제되었습니다")
            navigate('/notice');
        } catch (error) {
            console.error('Error', error);
            alert("오류")
        }
    };
     return (
        <div className={style.container}>
            <Title level={1}>Notice</Title>
            <Typography.Paragraph>
                {/* 폼 테이블 스타일 적용 */}
                <table className={style.formTable}>
                    <tbody>
                        <tr>
                            <th className={style.formTableTh}>제목</th>
                            <td className={style.formTableTd}>{list?.title}</td>
                        </tr>
                        <tr>
                            <th className={style.formTableTh}>작성자</th>
                            <td className={style.formTableTd}>{list?.writer}</td>
                        </tr>
                        <tr>
                            <th className={style.formTableTh}>내용</th>
                            <td className={style.formTableTd} style={{ minHeight: '300px' }}> {/* 최소 높이 지정 */}
                                {list?.contents}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Typography.Paragraph>

            {/* 버튼들을 테이블 바깥으로 이동 및 Space 컴포넌트로 정리 */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Space>
                    <Button onClick={handleDeleteClick} type="primary" danger>
                        삭제
                    </Button>
                    <Link to={`/notice/reform/${list?.num}`}>
                        <Button type="primary">
                            수정
                        </Button>
                    </Link>
                    <Link to="/notice">
                        <Button>
                            목록으로
                        </Button>
                    </Link>
                </Space>
            </div>
        </div>
    );
};

export default NoticeDetail;