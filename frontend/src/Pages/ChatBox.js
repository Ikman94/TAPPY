import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

let allUsers = [];
let allMessages = [];
let allSelectedUser = {};
const ENDPOINT =
    window.location.host.indexOf('localhost') >= 0
        ? 'http://127.0.0.1:5000'
        : window.location.host;

export default function ChatBox(props) {
    const { userInfo } = props;
    const [socket, setSocket] = useState(null);
    const [selectedUser, setSelectedUser] = useState({});
    const uiMessagesRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [messageBody, setMessageBody] = useState('');
    const [messages, setMessages] = useState([
        { name: 'Admin', body: 'Hello, How can i help you?' },
    ]);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        if (uiMessagesRef.current) {
            uiMessagesRef.current.scrollBy({
                top: uiMessagesRef.current.clientHeight,
                left: 0,
                behavior: 'smooth',
            });
        }

        if (!socket) {
            const sk = socketIOClient(ENDPOINT);
            setSocket(sk);
            sk.emit('onLogin', {
                _id: userInfo._id,
                name: userInfo.name,
                isAdmin: userInfo.isAdmin,
            });
            sk.on('message', (data) => {
                if (allSelectedUser._id === data._id) {
                    allMessages = [...allMessages, data];
                } else {
                    const existUser = allUsers.find((user) => user._id === data._id);
                    if (existUser) {
                        allUsers = allUsers.map((user) =>
                            user._id === existUser._id ? { ...user, unread: true } : user
                        );
                        setUsers(allUsers);
                    }
                }
                setMessages(allMessages);
            });
            sk.on('updateUser', (updatedUser) => {
                const existUser = allUsers.find((user) => user._id === updatedUser._id);
                if (existUser) {
                    allUsers = allUsers.map((user) =>
                        user._id === existUser._id ? updatedUser : user
                    );
                    setUsers(allUsers);
                } else {
                    allUsers = [...allUsers, updatedUser];
                    setUsers(allUsers);
                }
            });
            sk.on('listUsers', (updatedUsers) => {
                allUsers = updatedUsers;
                setUsers(allUsers);
            });
            sk.on('selectUser', (user) => {
                allMessages = user.messages;
                setMessages(allMessages);
            });
        }

    }, [messages, isOpen, socket]);

    const supportHandler = () => {
        setIsOpen(true);
        const sk = socketIOClient(ENDPOINT);
        setSocket(sk);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!messageBody.trim()) {
            alert('Error. Please type message.');
        } else {
            setMessages([...messages, { body: messageBody, name: userInfo.name }])
            setMessageBody('');
            setTimeout(() => {
                socket.emit('onMessage', {
                    body: messageBody,
                    name: userInfo.name,
                    isAdmin: userInfo.isAdmin,
                    _id: selectedUser._id,
                });
            }, 1000);
        }
    };
    const closeHandler = () => {
        setIsOpen(false)
    };

    return (
        <div className="chatbox">
            {!isOpen ? (
                <button type="button" onClick={supportHandler}>
                    <i class="far fa-comment-alt"></i>
                </button>
            ) :
                (
                    <div className="card card-body">
                        <div className="ow">
                            <strong>Support</strong>
                            <button type="button" onClick={closeHandler}>
                                <i className="fa fa-close" />
                            </button>
                        </div>
                        <ul ref={uiMessagesRef}>
                            {messages.map((msg, index) => (
                                <li key={index}>
                                    <strong>{`${msg.name}: `}</strong> {msg.body}
                                </li>
                            ))}
                        </ul>
                        <div>
                            <form onSubmit={submitHandler} className="ow">
                                <input
                                    value={messageBody}
                                    onChange={(e) => setMessageBody(e.target.value)}
                                    type="text"
                                    placeholder="type message"
                                />
                                <button type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
