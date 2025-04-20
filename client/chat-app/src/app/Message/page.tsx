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
import { vi } from 'date-fns/locale';
import { sendMessageApi } from "@/lib/sendmessage";
import { useRef } from 'react';
import Image from 'next/image';


interface LatestMessage {
    senderEmail: string;
    receiverEmail?: string;
    createdAt: string;
    message?: string;
    file?: string;
    relatedEmail: string;
}

const MessagePage = () => {

    const [isMobile, setIsMobile] = React.useState(false);
    const [isConversationSelected, setIsConversationSelected] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

    const [message, setMessage] = useState('');

    const bottomRef = useRef<HTMLDivElement>(null);
    const [searchKeyword, setSearchKeyword] = useState('');

    const { messages, error, isLoading, mutate: mutateMessages } = useMessages(userId || "");
    const { sent_messages, error: sentM_Error, isLoading: sentM_Loading, mutate: mutateSentMessages } = useSentMessages(userId || "");

    const { users, error: userError, isLoading: userLoading } = useAllUsers();
    const [isSending, setIsSending] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);



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

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);



    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedEmail, messages, sent_messages, message]);




    if (isLoading || userLoading || sentM_Loading) return <div>Loading...</div>;
    if (error || userError || sentM_Error) return <div>Error occurred: {error.message}</div>;
    if (!messages || !users || !sent_messages) return <div>No user found.</div>;

    const emailToLatestMessage: Record<string, LatestMessage> = {};

    (messages ?? []).forEach((msg) => {
        const email = msg.senderEmail;
        const entry: LatestMessage = { ...msg, relatedEmail: email };
        if (!emailToLatestMessage[email] || new Date(msg.createdAt) > new Date(emailToLatestMessage[email].createdAt)) {
            emailToLatestMessage[email] = entry;
        }
    });

    (sent_messages ?? []).forEach((msg) => {
        const email = msg.receiverEmail;
        const entry: LatestMessage = { ...msg, relatedEmail: email };
        if (!emailToLatestMessage[email] || new Date(msg.createdAt) > new Date(emailToLatestMessage[email].createdAt)) {
            emailToLatestMessage[email] = entry;
        }
    });

    const allMessages = Object.values(emailToLatestMessage);

    const handleSend = async () => {
        if (isSending) return;
        if (!selectedEmail) return;

        try {
            setIsSending(true);
            if (selectedFile && message.trim()) {
                const messageResult = await sendMessageApi(selectedEmail, message, selectedFile);
                if (messageResult.success) {
                    setMessage('');
                    setSelectedFile(null);
                    mutateMessages();
                    mutateSentMessages();
                }
            }
            else if (selectedFile && !message.trim()) {
                const messageResult = await sendMessageApi(selectedEmail, "", selectedFile);
                if (messageResult.success) {
                    setMessage('');
                    setSelectedFile(null);
                    mutateMessages();
                    mutateSentMessages();
                }
            }

            else {
                const messageResult = await sendMessageApi(selectedEmail, message, null);
                if (messageResult.success) {
                    setMessage('');
                    mutateMessages();
                    mutateSentMessages();
                }
            }
        } catch (err) {
            console.error(err);
            alert("Đã có lỗi xảy ra.");
        } finally {
            setIsSending(false);                             // ← kết thúc gửi
        }
    };
    // Hàm để tìm tên người dùng từ email
    const getUserNameByEmail = (email: string) => {
        const user = users.find(u => u.email === email);
        return user ? user.name : email;
    };

    //Lấy toàn bộ tin nhắn của người dùng hiện tại với người có email là "email"
    const getConversationWith = (email: string) => {
        const allMsgs = [
            ...messages.filter((msg) => msg.senderEmail === email),
            ...sent_messages.filter((msg) => msg.receiverEmail === email),
        ];

        const expandedMessages = allMsgs.flatMap((msg) => {
            const common = {
                senderEmail: msg.senderEmail,
                createdAt: msg.createdAt,
            };

            const parts = [];
            if (msg.message) {
                parts.push({ ...common, type: 'text', content: msg.message });
            }
            if (msg.file) {
                parts.push({ ...common, type: 'file', content: msg.file });
            }
            return parts;
        });

        return expandedMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };

    const searchByKw = (kw: string) => {
        if (!kw) return allMessages;
        return allMessages.filter(item => {
            const userName = getUserNameByEmail(item.relatedEmail).toLowerCase();
            return userName.includes(kw.toLowerCase());
        });
    };

    const getFileName = (url: string | URL): string => {
        try {
            const urlObj = typeof url === 'string' ? new URL(url) : url;
            const pathname = urlObj.pathname;
            return pathname.split('/').pop() || 'File đính kèm';
        } catch {
            return 'File đính kèm';
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click(); // mở File Explorer
    };

    // Hàm này sẽ được gọi khi người dùng chọn file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedFile(file);
        }
    }


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
                    {(!isMobile || !isConversationSelected) && (
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
                                            onClick={() => {
                                                setSelectedEmail(item.relatedEmail);
                                                if (isMobile) {
                                                    setIsConversationSelected(true);
                                                }
                                            }}
                                        >
                                            <div className="textPart">
                                                <span className="userName">{getUserNameByEmail(item.relatedEmail)}</span>
                                                {item.message?.trim() && (
                                                    <span className="userMessage">{item.message}</span>
                                                )}
                                                {item.file && (
                                                    <div className='fileOutSide'>
                                                        <span className="fileLinkOutSide">
                                                            📁 1 file đính kèm
                                                        </span>
                                                    </div>
                                                )}
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

                    {(!isMobile || isConversationSelected) && (
                        <div className="messageContainer">
                            {selectedEmail ? (
                                <>
                                    <div className="headerText">
                                        {isMobile && (
                                            <button
                                                onClick={() => setIsConversationSelected(false)}
                                                className="backButton"
                                            >
                                                ←
                                            </button>
                                        )}
                                        {getUserNameByEmail(selectedEmail)}
                                    </div>
                                    <div className="divider" />
                                    <div className="conversationBox">
                                        {getConversationWith(selectedEmail).map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={`messageBubble ${msg.senderEmail === userEmail ? 'sent' : 'received'} ${msg.type === 'file' ? 'fileMessage' : ''}`}
                                            >
                                                {msg.type === 'text' ? (
                                                    <div>{msg.content}</div>
                                                ) : (
                                                    <div className="fileCard">
                                                        <div className="fileInfo">📁
                                                            <a href={msg.content} target="_blank" rel="noopener noreferrer" className="fileLink">
                                                                {getFileName(msg.content)}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <div ref={bottomRef} />
                                    </div>
                                    <div className='file_Container2'>
                                        {selectedFile && (
                                            <p className="fileText">📁 {selectedFile.name}</p>
                                        )}
                                    </div>
                                    <div className='chatContainer'>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                        <button className='attachButtonMP' onClick={handleButtonClick}>
                                            <Image
                                                className='btnIcon'
                                                src="/paper-clip.png"
                                                alt="Next.js logo"
                                                width={25}
                                                height={25}
                                                priority
                                            />
                                        </button>
                                        <input className='chatInput'
                                            type="text"
                                            placeholder="Nhập tin nhắn..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)} />
                                        <button className='sendButton'
                                            onClick={handleSend}
                                            disabled={isSending}
                                        >{isSending ? 'Sending...' : 'Send'}</button>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    )}
                </div>
            </SidebarInset >
        </SidebarProvider >
    );
};

export default MessagePage;
