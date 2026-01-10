// src/components/chat/MessageInput.jsx
import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            onSendMessage(inputValue);
            setInputValue(''); // Xóa ô nhập sau khi gửi
        }
    };

    return (
        <div className="chat-input-area">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control rounded-pill"
                        placeholder="Nhập tin nhắn..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button 
                        className="btn btn-primary rounded-pill ms-2 px-4" 
                        type="submit"
                        disabled={!inputValue.trim()} // Disable nút nếu không có chữ
                    >
                        <i className="bi bi-send-fill"></i> {/* Bootstrap Icon */}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MessageInput;