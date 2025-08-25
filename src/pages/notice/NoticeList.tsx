import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from '../../styles/notice.module.css';
import { Typography, Space, Pagination, Button,Select,Input  } from 'antd'; 
import JokeDisplay from '../../components/JokeDisplay';

interface NoticeVO {
    num: number;
    title?: string;
    writer?: string;
    contents: string;
    hit: number;
    ndate: string;
}
const { Title } = Typography;

const NoticeList: React.FC = () => {
    const navigate = useNavigate();
    const [noticeList, setNoticeList] = useState<NoticeVO[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    
    const [searchType, setSearchType] = useState('1');
    const [searchValue, setSearchValue] = useState('');

    const pageSize = 10; 

    const fetchNoticeList = async (page: number) => {
        console.log("서버에 요청하는 페이지 번호:", page);
        try {
            const response = await axios.get('http://192.168.0.35/blueteam/notice/nlist', {
                params: {
                    currPage: page,
                    searchType: searchType,
                    searchValue: searchValue
                }
            });
            const data = response.data;
            console.log("서버 응답 전체 데이터:", data);
            setNoticeList(data.data);
            setTotalItems(data.totalItems);
            setCurrentPage(data.currentPage);
        } catch (error) {
            console.error("공지 목록 가져오기 실패:", error);
        }
    };

    // [핵심 수정 부분]
    // useEffect의 의존성 배열에서 searchType과 searchValue를 제거했습니다.
    // 이제 searchType이나 searchValue가 변경되어도 자동으로 fetch를 호출하지 않습니다.
    useEffect(() => {
        fetchNoticeList(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        console.log(`선택한 페이지: ${page}`);
        setCurrentPage(page);
    };

    // [핵심 수정 부분]
    // searchFunction은 '검색' 버튼을 눌렀을 때만 동작하며, 
    // currentPage가 1일 경우 직접 fetch를 호출하고,
    // 1이 아닐 경우 currentPage를 1로 변경하여 useEffect를 트리거하도록 했습니다.
    const searchFunction = () => {
        if (currentPage === 1) {
            fetchNoticeList(1);
        } else {
            setCurrentPage(1);
        }
    };

    const handleWirte = () => {
        navigate('/notice/form');
    };

    const itemRender = (
      _: number, 
      type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', 
      originalElement: React.ReactNode
    ) => {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };

    return (
        <div className={style.container}>
            <Title level={1}>Notice</Title>
            <Typography.Paragraph>
                <table className={style.boardTable}>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticeList.map(item => (
                            <tr key={item.num}>
                                <td><Link to={`/notice/detail/${item.num}`}> {item.title}</Link> </td>
                                <td>{item.writer}</td>
                                <td>{item.ndate}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={3}>
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                                    <Pagination
                                        current={currentPage}
                                        total={totalItems}
                                        pageSize={pageSize}
                                        onChange={handlePageChange}
                                        showSizeChanger={false}
                                        itemRender={itemRender}
                                    />
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={3}>
                              <Space.Compact>
                                    <Select value={searchType} onChange={(value) => setSearchType(value)}>
                                    <Select.Option value="1">작성자</Select.Option>
                                    <Select.Option value="2">제목</Select.Option>
                                    <Select.Option value="3">내용</Select.Option>
                                    </Select>
    <Input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onPressEnter={searchFunction}
    />
    <Button type="primary" onClick={searchFunction}>
        검색
    </Button>
</Space.Compact>
                            </th>
                        </tr>
                        <tr>
                            <td colSpan={3} style={{ textAlign: "center" }}>
                                <Button type="primary" onClick={handleWirte}>
                                    글쓰기
                                </Button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <div style={{ padding: '20px', border: '1px solid lightgray', margin: '20px' }}>
                    <JokeDisplay />
                </div>
            </Typography.Paragraph>
        </div>
    );
};

export default NoticeList;