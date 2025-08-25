import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from '../../styles/notice.module.css' // notice.module.css는 여전히 사용
import { Typography, Button, Space, Input } from 'antd'; // Ant Design Input 추가

interface NoticeVO {
    num?: number;
    title: string;
    writer: string;
    contents: string;
    hit?: number;
    ndate?: string;
}

const { Title } = Typography;
const { TextArea } = Input; // Input.TextArea를 사용하기 위해 구조 분해 할당

const NoticeForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<NoticeVO>({
        title: '',
        writer: '',
        contents: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(
               'http://192.168.0.35/blueteam/notice/add', formData, { headers: { 'Content-Type': 'application/json' } }
            );
            navigate('/notice'); // 공지사항 목록으로 이동
        } catch (error) {
            console.error('Error ->', error);
            // message.error('공지사항 등록에 실패했습니다.'); // Ant Design message 사용 고려
        }
    };

    const handleCancel = () => {
        navigate('/notice'); // 취소 시 공지사항 목록으로 이동
    };

    return (
        <div className={style.container}>
            <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>공지사항 등록</Typography.Title>
       
            <Typography.Paragraph>
                <form onSubmit={handleSubmit} className={style.form}>
                    <table className={style.formTable}>
                        <tbody>
                            <tr>
                                <th className={style.tableHeader}>제목</th>
                                <td>
                                    <Input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="제목을 입력하세요"
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className={style.tableHeader}>작성자</th>
                                <td>
                                    <Input
                                        type="text"
                                        name="writer"
                                        id="writer"
                                        value={formData.writer}
                                        onChange={handleChange}
                                        placeholder="작성자를 입력하세요"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className={style.tableHeader}>내용</th>
                                <td>
                                    <TextArea
                                        name="contents"
                                        id="contents"
                                        value={formData.contents}
                                        onChange={handleChange}
                                        rows={10}
                                        placeholder="내용을 입력하세요"
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={2} style={{ textAlign: 'right', paddingTop: '20px' }}>
                                    <Space>
                                        <Button type="primary" htmlType="submit">
                                            등록하기
                                        </Button>
                                        <Button onClick={handleCancel}  type="primary">
                                            취소
                                        </Button>
                                    </Space>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                </form>
            </Typography.Paragraph>
        </div>
    )
}

export default NoticeForm;