// src/components/chat/MessageList.jsx
import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const MessageList = ({ messages, currentUserRole }) => {
    // Tạo một ref để tham chiếu đến cuối danh sách tin nhắn
    const messagesEndRef = useRef(null);

    // Hàm cuộn xuống dưới cùng
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Sử dụng useEffect để gọi scrollToBottom mỗi khi danh sách messages thay đổi
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="message-list-container">
            {messages.map((msg) => (
                <MessageBubble 
                    key={msg.id} 
                    message={msg} 
                    currentUserRole={currentUserRole} 
                />
            ))}
            {/* Một thẻ div trống ở cuối để làm điểm neo cho việc cuộn */}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;