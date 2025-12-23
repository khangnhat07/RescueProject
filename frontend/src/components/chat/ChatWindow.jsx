import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = ({ messages, currentUserRole, onSendMessage, chatTitle }) => {
    
    // Hàm xử lý giả khi bấm nút (sau này bạn gắn logic thật vào đây)
    const handleCallClick = () => {
        alert("Đang kết nối cuộc gọi...");
    };

    return (
        <div className="chat-container bg-white">
            {/* --- HEADER --- */}
            <div className="chat-header d-flex justify-content-between align-items-center">
                
                {/* Bên trái: Avatar + Tên */}
                <div className="d-flex align-items-center">
                    <i className="bi bi-person-circle fs-4 me-2"></i>
                    <span className="fw-bold">{chatTitle}</span>
                </div>

                {/* Bên phải: Các nút gọi và Menu */}
                <div className="d-flex align-items-center gap-3"> {/* gap-3 tạo khoảng cách giữa các icon */}
                    
                    {/* Nút Gọi Thoại (Phone) */}
                    <button 
                        className="btn btn-light btn-sm rounded-circle text-primary" 
                        onClick={handleCallClick}
                        title="Gọi điện"
                        style={{ width: '35px', height: '35px' }} // Chỉnh kích thước nút tròn
                    >
                        <i className="bi bi-telephone-fill"></i>
                    </button>

                    {/* Nút Gọi Video (Camera) */}
                    <button 
                        className="btn btn-light btn-sm rounded-circle text-primary" 
                        onClick={handleCallClick}
                        title="Gọi Video"
                        style={{ width: '35px', height: '35px' }}
                    >
                        <i className="bi bi-camera-video-fill"></i>
                    </button>

                    {/* Nút Menu 3 chấm (Cũ) */}
                    <i className="bi bi-three-dots-vertical cursor-pointer" style={{ cursor: 'pointer' }}></i>
                </div>
            </div>

            {/* Danh sách tin nhắn */}
            <MessageList messages={messages} currentUserRole={currentUserRole} />

            {/* Ô nhập liệu */}
            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
};

export default ChatWindow;