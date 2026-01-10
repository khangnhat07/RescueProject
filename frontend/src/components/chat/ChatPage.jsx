import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAuth } from '../../context/AuthContext';
import { fetchChatHistoryAPI } from '../../service/api.service';
import '../../styles/ChatStyles.css';

const ChatPage = () => {
    const { user } = useAuth();
    const { roomId } = useParams();
    const token = localStorage.getItem('jwt');

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    const stompClientRef = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!user || !roomId) return;

        fetchChatHistoryAPI(roomId)
           .then(res => setMessages(res.data || []))
           .catch(err => console.error(err));

        const socket = new SockJS('http://localhost:5454/ws');
        const client = Stomp.over(socket);
        client.debug = null; 

        client.connect({ 'Authorization': `Bearer ${token}` }, () => {
            setIsConnected(true);
            client.subscribe(`/topic/room/${roomId}`, (payload) => {
                const newMessage = JSON.parse(payload.body);
                setMessages((prev) => [...prev, newMessage]);
            });
        }, () => setIsConnected(false));

        stompClientRef.current = client;

        return () => { if (client && client.connected) client.disconnect(); };
    }, [roomId, user, token]);

    useEffect(() => scrollToBottom(), [messages]);

    const handleSendMessage = () => {
        if (!inputMessage.trim() || !isConnected) return;
        const chatMessage = {
            senderEmail: user.email,
            content: inputMessage,
            roomId: roomId,
            timestamp: new Date().toISOString()
        };
        stompClientRef.current.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage));
        setInputMessage("");
    };

    if (!user) return <div style={{color: 'white', padding: 20}}>Vui lòng đăng nhập...</div>;

    return (
        <div className="chat-page-wrapper">
            <div className="chat-container">
                {/* SIDEBAR */}
                <div className="chat-sidebar">
                    <div className="sidebar-header">THÀNH VIÊN</div>
                    <div className="user-list">
                        <div className="user-item">
                            <div className="online-dot" style={{background:'#3ba55c'}}></div>
                            {user.email.split('@')[0]} (Bạn)
                        </div>
                        <div className="user-item">
                            <div className="online-dot" style={{background:'#747f8d'}}></div>
                            Admin_Support
                        </div>
                    </div>
                </div>

                {/* MAIN CHAT */}
                <div className="chat-main">
                    <div className="chat-header">
                        <div>
                            <span className="hashtag">#</span>
                            <span>cứu-hộ-{roomId}</span>
                        </div>
                        <div className="header-icons">
                            <button className="icon-btn"><i className="fas fa-phone-alt"></i></button>
                            <button className="icon-btn"><i className="fas fa-video"></i></button>
                            <button className="icon-btn"><i className="fas fa-user-friends"></i></button>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className="discord-message">
                                <img src={`https://ui-avatars.com/api/?name=${msg.senderEmail}&background=random&color=fff`} alt="avt" className="msg-avatar" />
                                <div>
                                    <div className="msg-header-info">
                                        <span className="msg-username">{msg.senderEmail.split('@')[0]}</span>
                                        <span className="msg-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    <div className="msg-text">{msg.content}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input-container">
                        <div className="chat-input-wrapper">
                            <input 
                                className="chat-input-field"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder={`Nhập tin nhắn...`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;