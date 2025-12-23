import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'; 
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios'; 
import '../../styles/ChatStyles.css';

const ChatPage = () => {
    // 1. Lấy roomId động từ URL (Ví dụ: /chat/REQ_123 -> roomId = "REQ_123")
// --- 1. FAKE DATA ĐỂ TEST (Sửa đoạn này) ---
    
    // Thay vì lấy từ URL, ta gán cứng luôn
    // const { roomId } = useParams(); 
    const roomId = "TEST_PHONG_01"; 

    // Fake token luôn nếu bạn chưa làm chức năng Login
    // (Lấy đại 1 chuỗi bất kỳ, miễn là backend không validate quá gắt gao lúc test)
    const token = localStorage.getItem("jwt") || "fake-token-de-test";
    
    // Fake email người gửi
    const currentUserEmail = localStorage.getItem("email") || "nguoi_test_A@gmail.com"; 

    // -------------------------------------------

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    
    const stompClientRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Tự động cuộn xuống cuối
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => scrollToBottom(), [messages]);

    // --- EFFECT CHÍNH: Lấy lịch sử & Kết nối WebSocket ---
    useEffect(() => {
        if (!roomId || !token) return;

        // A. Lấy lịch sử chat (Có kèm Token để tránh lỗi 403)
        axios.get(`http://localhost:5454/api/chat/history/${roomId}`, {
            headers: {
                "Authorization": `Bearer ${token}` // QUAN TRỌNG: Phải có dòng này
            }
        })
        .then(res => {
            console.log("Lịch sử chat:", res.data);
            setMessages(res.data);
        })
        .catch(err => {
            console.error("Lỗi lấy lịch sử chat:", err);
            // Nếu lỗi 401/403 -> Có thể token hết hạn, đá ra trang login
        });

        // B. Kết nối WebSocket
        const socket = new SockJS('http://localhost:5454/ws');
        const client = Stomp.over(socket);
        client.debug = null; // Tắt log rác trong console

        client.connect({}, () => {
            console.log(`Đã kết nối vào phòng: ${roomId}`);
            setIsConnected(true);

            // Subscribe nhận tin nhắn mới
            client.subscribe(`/topic/room/${roomId}`, (payload) => {
                const newMessage = JSON.parse(payload.body);
                setMessages((prev) => [...prev, newMessage]);
            });
        }, (error) => {
            console.error("Lỗi kết nối WS:", error);
            setIsConnected(false);
        });

        stompClientRef.current = client;

        // Cleanup: Ngắt kết nối khi thoát trang
        return () => {
            if (client && client.connected) {
                client.disconnect();
                console.log("Đã ngắt kết nối");
            }
        };
    }, [roomId, token]); 


    // --- Xử lý gửi tin nhắn ---
    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        if (stompClientRef.current && isConnected) {
            const chatMessage = {
                senderEmail: currentUserEmail,
                content: inputMessage,
                roomId: roomId 
                // Có thể thêm senderRole, avatar nếu backend cần
            };

            try {
                // Gửi lên topic mà Backend đang lắng nghe (MessageMapping)
                stompClientRef.current.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
                setInputMessage(""); // Xóa ô nhập
            } catch (error) {
                console.error("Lỗi khi gửi tin:", error);
            }
        } else {
            alert("Mất kết nối máy chủ! Vui lòng đợi...");
        }
    };

    if (!roomId) return <div>Đang tải phòng chat...</div>;

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h3>Phòng: {roomId}</h3> 
                <span className={`status-dot ${isConnected ? 'online' : 'offline'}`}>
                    {isConnected ? "🟢 Online" : "🔴 Mất kết nối"}
                </span>
            </div>

            <div className="chat-window">
                {messages.map((msg, index) => {
                    const isMyMessage = msg.senderEmail === currentUserEmail;
                    return (
                        <div key={index} className={`message-row ${isMyMessage ? 'my-message' : 'other-message'}`}>
                            <div className="message-bubble">
                                {/* Hiển thị tên người gửi nếu không phải là mình */}
                                {!isMyMessage && <div className="message-sender">{msg.senderEmail}</div>}
                                
                                <div className="message-content">{msg.content}</div>
                                
                                {/* Nếu có timestamp thì hiển thị giờ (Optional) */}
                                {/* <div className="message-time">{new Date(msg.timestamp).toLocaleTimeString()}</div> */}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <input 
                    type="text" 
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={isConnected ? "Nhập tin nhắn..." : "Đang kết nối..."}
                    disabled={!isConnected}
                />
                <button onClick={handleSendMessage} disabled={!isConnected}>
                    Gửi
                </button>
            </div>
        </div>
    );
};

export default ChatPage;