import React, { useRef, useEffect } from "react";
import { Empty } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import { RagMessage } from "../../types";
import { useStyles } from "../../style";
import RequestBubble from "../../../components/RequestBubble";
import ResponseBubble from "../../../components/ResponseBubble";

interface MessageListProps {
  messages: RagMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const { styles } = useStyles();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新消息
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        {/* <DatabaseOutlined
          style={{ fontSize: 64, opacity: 0.6 }}
          className={styles.placeholderImage}
        /> */}
        <Empty
          description="选择一个知识库，开始RAG对话"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div className={styles.messagesContainer}>
      {messages.map((message) =>
        message.sender === "user" ? (
          <RequestBubble
            key={message.id}
            content={message.text}
            timestamp={message.timestamp}
          />
        ) : (
          <ResponseBubble
            key={message.id}
            content={message.text}
            timestamp={message.timestamp}
            isError={message.isError}
          />
        )
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
