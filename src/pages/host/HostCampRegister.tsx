import React from 'react';
import {
  Typography,
  Layout,
  Card,
  Form,
  Input,
  Button,
  notification,
  InputNumber,
  Upload,
  Tag,
  Tooltip,
} from 'antd';
import { InputRef } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Content } = Layout;
const { TextArea } = Input;

interface PropertyFormValues {
  propertyName: string;
  propertyAddress: string;
  propertyDescription: string;
  maxGuests: number;
  numRooms: number;
  propertyPhotos?: any;
}

const HostCampRegister: React.FC = () => {
  const onFinish = (values: PropertyFormValues) => {
    console.log('Received values:', values);
    notification.success({
      message: '캠핑장 등록 제출 완료',
      description: `"${values.propertyName}" 캠핑장이 검토를 위해 제출되었습니다.`,
    });
    // 실제 애플리케이션에서는 백엔드로 데이터 전송
  };

  const [tags, setTags] = React.useState<string[]>([]);
  const [inputVisible, setInputVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef<InputRef>(null);

  React.useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag: string) => {
    setTags(tags.filter(tag => tag !== removedTag));
  };

  const showInput = () => setInputVisible(true);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) setTags([...tags, inputValue]);
    setInputVisible(false);
    setInputValue('');
  };

  const handleFileUpload = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      notification.success({
        message: '사진 업로드 성공',
        description: `${info.file.name} 파일이 업로드되었습니다.`,
      });
    } else if (info.file.status === 'error') {
      notification.error({
        message: '사진 업로드 실패',
        description: `${info.file.name} 파일 업로드에 실패했습니다.`,
      });
    }
  };

  return (
    <Layout className="site-layout p-6" style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ maxWidth: '600px', width: '100%' }}>
          <Title level={2}>새 캠핑장 등록</Title>
          <Paragraph>아래 폼에 캠핑장 정보를 입력하세요.</Paragraph>
          <Form
            name="register_property_form"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="mt-4"
          >
            <Form.Item
              name="propertyName"
              label="캠핑장 이름"
              rules={[{ required: true, message: '캠핑장 이름을 입력해주세요!' }]}
            >
              <Input placeholder="예: 아늑한 산장" />
            </Form.Item>
            <Form.Item
              name="propertyAddress"
              label="주소"
              rules={[{ required: true, message: '캠핑장 주소를 입력해주세요!' }]}
            >
              <TextArea rows={2} placeholder="예: 서울시 강남구 산1길 123" />
            </Form.Item>
            <Form.Item
              name="propertyDescription"
              label="설명"
              rules={[{ required: true, message: '캠핑장 설명을 입력해주세요!' }]}
            >
              <TextArea rows={4} placeholder="예: 조용하고 아름다운 산장으로 휴식을 취하기 좋은 곳입니다." />
            </Form.Item>
            <Form.Item
              name="maxGuests"
              label="최대 수용 인원"
              rules={[{ required: true, message: '최대 인원을 입력해주세요!' }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} placeholder="예: 4" />
            </Form.Item>
            <Form.Item
              name="numRooms"
              label="객실 수"
              rules={[{ required: true, message: '총 객실 수를 입력해주세요!' }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} placeholder="예: 2" />
            </Form.Item>
            <Form.Item label="해시태그">
              {tags.map(tag => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag closable onClose={() => handleClose(tag)} style={{ marginBottom: '8px' }}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
              })}
              {inputVisible && (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  className="tag-input"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                  style={{ width: '120px' }}
                />
              )}
              {!inputVisible && (
                <Tag onClick={showInput} className="site-tag-plus">
                  <PlusOutlined /> 새 해시태그
                </Tag>
              )}
            </Form.Item>
            <Form.Item
              name="propertyPhotos"
              label="캠핑장 사진"
              valuePropName="fileList"
              getValueFromEvent={(e: any) => e?.fileList}
              rules={[{ required: true, message: '사진을 최소 한 장 업로드해주세요!' }]}
            >
              <Upload name="photos" listType="picture" multiple beforeUpload={() => false} onChange={handleFileUpload}>
                <Button icon={<UploadOutlined />}>업로드 클릭</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                캠핑장 등록 제출
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default HostCampRegister;