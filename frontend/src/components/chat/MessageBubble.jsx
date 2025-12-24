// src/components/chat/MessageBubble.jsx
import React from 'react';

const MessageBubble = ({ message, currentUserRole }) => {
    // Kiểm tra xem tin nhắn này có phải do người dùng hiện tại gửi không
    // Ví dụ: Nếu tôi là 'USER' và tin nhắn cũng từ 'USER' -> là tin nhắn gửi đi (sent)
    const isMyMessage = message.senderRole === currentUserRole;

    const bubbleClass = isMyMessage ? 'message-sent' : 'message-received';

    // Format thời gian đơn giản
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={`message-bubble ${bubbleClass} shadow-sm`}>
            {/* Hiển thị tên người gửi nếu là tin nhắn nhận được (tùy chọn) */}
            {!isMyMessage && <div className="fw-bold mb-1 small text-primary">{message.senderName}</div>}
            
            <div>{message.text}</div>
            
            <span className="message-timestamp text-end">
                {formatTime(message.timestamp)}
            </span>
        </div>
    );
};

export default MessageBubble;