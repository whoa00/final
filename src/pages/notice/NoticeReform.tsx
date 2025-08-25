import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import style from '../../styles/notice.module.css'; // notice.module.css는 여전히 사용
import { Typography, Button, Space, Input } from 'antd'; // Ant Design Input 추가

// Ant Design Typography.Paragraph를 사용하여 스타일 통일
const { Paragraph, Title } = Typography;
const { TextArea } = Input;

interface NoticeVO {
  num?: number;
  title: string;
  writer: string;
  contents: string;
  hit?: number;
  ndate?: string;
}

const NoticeReform: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<NoticeVO>({
    num: undefined,
    title: '',
    writer: '',
    contents: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://192.168.0.35/blueteam/notice/update', formData, { headers: { 'Content-Type': 'application/json' } }
      );
      navigate(`/notice/detail/${id}`);
    } catch (error) {
      console.error('Error ->', error);
    }
  };

  useEffect(() => {
    const detailServer = async () => {
      try {
        const resp = await axios.get<NoticeVO>(`http://192.168.0.35/blueteam/notice/detail?num=${id}`);
        setFormData(resp.data);
      } catch (error) {
        console.error('Error fetching detail:', error);
      }
    };
    detailServer();
  }, [id]);

   return (
        <div className={style.container}>
            <Title level={1}>Notice</Title>
            <Paragraph>
                <form onSubmit={handleSubmit}>
                    <table className={style.formTable}> {/* formTable 클래스 추가 */}
                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td>
                                    <Input
                                        className={style.formInput} // CSS 모듈 클래스 적용
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td>
                                    <TextArea
                                        className={style.formTextarea} // CSS 모듈 클래스 적용
                                        name="contents"
                                        value={formData.contents}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className={style.formTableFooter}>
                                    <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                        수정
                                    </Button>
                                    <Link to={`/notice/detail/${id}`}>
                                        <Button type="primary">취소</Button>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Paragraph>
        </div>
    );
};

export default NoticeReform;
