// pages/host/HostProfileEditor.tsx
import React, { useState } from 'react';
import { Input, Button, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const HostProfileEditor: React.FC = () => {
  const [name, setName] = useState('홍길동');
  const [bio, setBio] = useState('안녕하세요! 저는 호스트입니다.');
  const [image, setImage] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');

  return (
    <div style={{ display: 'flex', gap: 40, padding: 24 }}>
      {/* 편집 영역 */}
      <div style={{ flex: 1, maxWidth: 400 }}>
        <h2>프로필 편집</h2>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          style={{ marginBottom: 12 }}
        />
        <Input.TextArea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="소개글"
          rows={4}
          style={{ marginBottom: 12 }}
        />
        <Upload
          beforeUpload={(file) => {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
            return false; // 업로드 방지
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />} style={{ marginBottom: 12 }}>
            프로필 이미지 업로드
          </Button>
        </Upload>
        <Space style={{ marginBottom: 12 }}>
          <label>배경 색상:</label>
          <Input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </Space>
        <Space>
          <label>텍스트 색상:</label>
          <Input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </Space>
      </div>

      {/* 미리보기 영역 */}
      <div
        style={{
          flex: 1,
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 24,
          backgroundColor,
          color: textColor,
        }}
      >
        {image && (
          <img
            src={image}
            alt="profile"
            style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }}
          />
        )}
        <h2>{name}</h2>
        <p>{bio}</p>
        <Button type="primary" style={{ marginTop: 12 }}>
          저장
        </Button>
      </div>
    </div>
  );
};

export default HostProfileEditor;
