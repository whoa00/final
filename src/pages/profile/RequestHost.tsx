import { Select } from 'antd';
import React from 'react'
import styles from '../profile/css/request.module.css'

const RequestHost: React.FC = () => {
    const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};
  return (
    <div className={styles.container}>
        {/* <h2>호스트 신청</h2> */}
        <tr>
            <td>사용자 이름</td>
            <input type="text" />
        </tr>
        <tr>
            <td>사용자 ID</td>
            <input type="text" disabled/>
        </tr>
        <tr>
            <td>사용자 이메일</td>
            <input type="email" disabled/>
        </tr>
        <tr>
            <td>사업자명</td>
            <input type="text" />
        </tr>
        <tr>
            <td>사업자 등록번호</td>
            <input type="text" maxLength={10} placeholder='-없이 숫자만 입력해주세요'/>
        </tr>
        <tr>
            <td>사업장 위치</td>
            <Select
                showSearch
                placeholder="지역을 선택하세요"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                options={[
                {value: '서울', label: '서울',},
                {value: '경기도', label: '경기도',},
                {value: '인천', label: '인천',},
                {value: '강원도', label: '강원도',},
                {value: '충청북도', label: '충청북도',},
                {value: '충청남도', label: '충청남도',},
                {value: '경상북도', label: '경상북도',},
                {value: '경상남도', label: '경상남도',},
                {value: '전라북도', label: '전라남도',},
                {value: '제주도', label: '제주도',},
                ]} />
            <input type="text" placeholder='상세주소' style={{marginLeft:'10px'}}/>
        </tr>
        <tr>
            <td>사업장 전화번호</td>
            <input type="number" />
        </tr>
    </div>
  )
}

export default RequestHost