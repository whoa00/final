import React, { useState } from "react";
import { Button, Input, List, Avatar, Card } from "antd";
import { MessageOutlined, SendOutlined, UserOutlined, CloseOutlined } from "@ant-design/icons";

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "me", text: input }]);
    setInput("");
    // 간단한 봇 응답
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: "안녕하세요! 😀" }]);
    }, 500);
  };

  return (
    <>
      {/* 오른쪽 아래 떠있는 버튼 */}
      {!open && (
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<MessageOutlined />}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
          onClick={() => setOpen(true)}
        />
      )}

      {/* 작은 박스 채팅창 */}
      {open && (
        <Card
          title="채팅"
          extra={
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => setOpen(false)}
            />
          }
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 320,
            height: 420,
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
          bodyStyle={{ display: "flex", flexDirection: "column", flex: 1, padding: "8px" }}
        >
          {/* 메시지 영역 */}
          <div style={{ flex: 1, overflowY: "auto", marginBottom: 8, paddingRight: 4 }}>
            <List
              dataSource={messages}
              renderItem={(item) => (
                <List.Item
                  style={{
                    justifyContent: item.sender === "me" ? "flex-end" : "flex-start",
                    border: "none",
                    padding: "4px 0",
                  }}
                >
                  {item.sender === "bot" && <Avatar size="small" icon={<UserOutlined />} />}
                  <div
                    style={{
                      background: item.sender === "me" ? "#1677ff" : "#f1f1f1",
                      color: item.sender === "me" ? "#fff" : "#000",
                      padding: "6px 10px",
                      borderRadius: 16,
                      maxWidth: "70%",
                      marginLeft: item.sender === "me" ? 0 : 8,
                      wordBreak: "break-word",
                    }}
                  >
                    {item.text}
                  </div>
                </List.Item>
              )}
            />
          </div>

          {/* 입력 영역 */}
          <div style={{ display: "flex", gap: 8 }}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={handleSend}
              placeholder="메시지를 입력하세요..."
            />
            <Button type="primary" icon={<SendOutlined />} onClick={handleSend} />
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;
