'use client';

import React, { useEffect, useState } from 'react';
import '@/styles/message.css';
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { useMessages } from "@/hooks/use-getMessage";
import { useAllUsers } from "@/hooks/use-getAllUser";
import { useSentMessages } from "@/hooks/use-getSentMessage";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale'; // nếu muốn tiếng Việt
import { sendMessageApi } from "@/lib/sendmessage";
import { useRef } from 'react';



const userItems = Array.from({ length: 10 }, (_, index) => ({
    avatar: '/avatar.png',
    name: `Nguyen Van B ${index + 1}`,
    textMessage: 'ahjndbajdbjabdhjabdhjabdahjdb',
    time: '5 hour ago',
}));

function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}

const MessagePage = () => {
    const isMobile = useIsMobile();
    const [selectedUser, setSelectedUser] = React.useState<number | null>(null);

    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

    const [message, setMessage] = useState('');

    const bottomRef = useRef<HTMLDivElement>(null);
    const [searchKeyword, setSearchKeyword] = useState('');



    useEffect(() => {
        const id = localStorage.getItem('_id');
        if (id) {
            setUserId(id);
        }
    }, []);

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            setUserEmail(email);
        }
    }, []);

    const { messages, error, isLoading, mutate: mutateMessages } = useMessages(userId || "");
    const { sent_messages, error: sentM_Error, isLoading: sentM_Loading, mutate: mutateSentMessages } = useSentMessages(userId || "");

    const { users, error: userError, isLoading: userLoading } = useAllUsers();

    const handleSend = async () => {

        if (!selectedEmail) {
            return;
        }

        const result = await sendMessageApi(selectedEmail, message);
        if (result.success) {
            setMessage('');
            // Gọi mutate để revalidate cả 2 danh sách tin nhắn
            mutateMessages();
            mutateSentMessages();
        } else {
            console.error(result.error);
        }
    };



    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedEmail, messages, sent_messages, message]);



    if (isLoading || userLoading || sentM_Loading) return <div>Loading...</div>;
    if (error || userError || sentM_Error) return <div>Error occurred: {error.message}</div>;
    if (!messages || !users || !sent_messages) return <div>No user found.</div>;

    const emailToLatestMessage: { [email: string]: any } = {};

    (messages ?? []).forEach((msg) => {
        const email = msg.senderEmail;
        if (!emailToLatestMessage[email] || new Date(msg.createdAt) > new Date(emailToLatestMessage[email].createdAt)) {
            emailToLatestMessage[email] = { ...msg, relatedEmail: email };
        }
    });

    (sent_messages ?? []).forEach((msg) => {
        const email = msg.receiverEmail;
        if (!emailToLatestMessage[email] || new Date(msg.createdAt) > new Date(emailToLatestMessage[email].createdAt)) {
            emailToLatestMessage[email] = { ...msg, relatedEmail: email };
        }
    });

    const allMessages = Object.values(emailToLatestMessage);



    // Hàm để tìm tên người dùng từ email
    const getUserNameByEmail = (email: string) => {
        const user = users.find(u => u.email === email);
        return user ? user.name : email;
    };

    //Lấy toàn bộ tin nhắn của người dùng hiện tại với người có email là "email"
    const getConversationWith = (email: string) => {
        return [
            //Lọc những tin nhắn được gửi từ người kia
            ...messages.filter((msg) => msg.senderEmail === email),
            //Lọc những tin nhắn người kia nhận được
            ...sent_messages.filter((msg) => msg.receiverEmail === email)
        ].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };

    const searchByKw = (kw: string) => {
        if (!kw) return allMessages;
        return allMessages.filter(item => {
            const userName = getUserNameByEmail(item.relatedEmail).toLowerCase();
            return userName.includes(kw.toLowerCase());
        });
    };


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1">
                                        Messages
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                {/* Nội dung message */}
                <div className="containerMessage">
                    {(!isMobile || !selectedUser) && (
                        <div className="userContainer">
                            <div className="searchContainer">
                                <input className="searhBox"
                                    type="text"
                                    placeholder="🔍 Search"
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                                <div className="userItemContainer">
                                    {searchByKw(searchKeyword).map((item, index) => (
                                        <div
                                            key={index}
                                            className="userItem"
                                            onClick={() => setSelectedEmail(item.relatedEmail)}
                                        >
                                            {/* <Image
                                                src={item.avatar}
                                                alt={`${item.name} icon`}
                                                width={40}
                                                height={40}
                                                className="userAvt"
                                            /> */}
                                            <div className="textPart">
                                                <span className="userName">{getUserNameByEmail(item.relatedEmail)}</span>
                                                <span className="userMessage">{item.message}</span>
                                            </div>
                                            <span className="userTime">
                                                {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: vi })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {(!isMobile || selectedUser !== null) && (
                        <div className="messageContainer">
                            {selectedEmail ? (
                                <>
                                    <div className="headerText">{getUserNameByEmail(selectedEmail)}</div>
                                    <div className="divider" />
                                    <div className="conversationBox">
                                        {getConversationWith(selectedEmail).map((msg, idx) => (
                                            //nếu tin nhắn có email người gửi là người dùng hiện tại thì sẽ có className là "sent" ngược lại là "received"
                                            <div key={idx} className={`messageBubble ${msg.senderEmail === userEmail ? 'sent' : 'received'}`}>
                                                <div>{msg.message}</div>
                                            </div>
                                        ))}
                                        <div ref={bottomRef} />
                                    </div>
                                    <div className='chatContainer'>
                                        <input className='chatInput'
                                            type="text"
                                            placeholder="Nhập tin nhắn..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)} />
                                        <button className='sendButton' onClick={handleSend}>Gửi</button>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider >
    );
};

export default MessagePage;
