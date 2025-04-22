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
    file?: string | string[];
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

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fileTypeMap: Record<string, { icon: string; description: string; gradient: string }> = {
        'doc|docx': {
            icon: '/word.png',
            description: 'Tài liệu Word',
            gradient: 'linear-gradient(to right, white, #007BFF)'
        },
        'pdf': {
            icon: '/pdf.png',
            description: 'Tài liệu PDF',
            gradient: 'linear-gradient(to right, white, #FF0000)'
        },
        'txt': {
            icon: '/txt-file.png',
            description: 'Tài liệu văn bản',
            gradient: 'linear-gradient(to right, white, #808080)'
        },
        'xls|xlsx': {
            icon: '/excel.png',
            description: 'Tài liệu Excel',
            gradient: 'linear-gradient(to right, white, #008000)'
        },
        'ppt|pptx': {
            icon: '/powerpoint.png',
            description: 'Tài liệu PowerPoint',
            gradient: 'linear-gradient(to right, white, #FFA500)'
        },
        'zip|rar|7z|tar|gz': {
            icon: '/rar.png',
            description: 'Tài liệu nén',
            gradient: 'linear-gradient(to right, white, #800080)'
        },
        'mp3|wav|aac|flac': {
            icon: '/audio.png',
            description: 'Tài liệu âm thanh',
            gradient: 'linear-gradient(to right, white, #FF0099)'
        },
        'js|ts|java|py|cpp|c|cs|html|css|json|xml|sql': {
            icon: '/coding.png',
            description: 'Mã nguồn',
            gradient: 'linear-gradient(to right, white,rgb(221, 193, 32))'
        }
    };

    const defaultFileType = {
        icon: '/default-file.png',
        description: 'File đính kèm',
        gradient: 'linear-gradient(to right, white, #CCCCCC)'
    };

    const getFileTypeInfo = (fileUrl: string) => {
        for (const [extensions, info] of Object.entries(fileTypeMap)) {
            const regex = new RegExp(`\\.(${extensions})$`, 'i');
            if (regex.test(fileUrl)) {
                return info;
            }
        }
        return defaultFileType;
    };



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
        if (isSending || !selectedEmail) return;

        try {
            setIsSending(true);
            const messageResult = await sendMessageApi(
                selectedEmail,
                message.trim(),
                selectedFiles // Truyền mảng files
            );

            if (messageResult.success) {
                setMessage('');
                setSelectedFiles([]);
                mutateMessages();
                mutateSentMessages();
            }
        } catch (err) {
            console.error(err);
            alert("Đã có lỗi xảy ra.");
        } finally {
            setIsSending(false);
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
                if (Array.isArray(msg.file)) {
                    msg.file.forEach((fileUrl) => {
                        parts.push({ ...common, type: 'file', content: fileUrl });
                    });
                } else if (typeof msg.file === 'string') {
                    parts.push({ ...common, type: 'file', content: msg.file });
                }
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
            // Xử lý trường hợp URL đã bị encode
            const urlString = typeof url === 'string'
                ? decodeURIComponent(url)
                : decodeURIComponent(url.toString());

            const urlObj = new URL(urlString);
            const pathname = urlObj.pathname;

            // Tách và lấy phần cuối cùng của pathname
            const fileName = pathname.split('/').pop() || 'File đính kèm';

            // Xử lý trường hợp fileName có chứa query params (ví dụ: ?version=123)
            return fileName.split('?')[0];
        } catch {
            return 'File đính kèm';
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click(); // mở File Explorer
    };

    // Hàm này sẽ được gọi khi người dùng chọn file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const filesArray = Array.from(files);
            setSelectedFiles(filesArray); // Cập nhật state thành mảng files
        }
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
                                                {item.file && (Array.isArray(item.file) ? item.file.length > 0 : item.file.trim() !== '') && (
                                                    <div className='fileOutSide'>
                                                        <span className="fileLinkOutSide">
                                                            📁 File đính kèm
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
                                                    <div >
                                                        {msg.content && (
                                                            /\.(jpg|jpeg|png|gif|webp|tiff|heic|tif|heif)$/i.test(msg.content) ? (
                                                                <div className="fileInfo">
                                                                    <a href={msg.content} target="_blank" rel="noopener noreferrer" className="fileLink">
                                                                        <img src={msg.content} alt="Ảnh đính kèm" className="imagePreview" />
                                                                    </a>
                                                                </div>
                                                            ) : /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i.test(msg.content) ? (
                                                                <div className="fileInfo">
                                                                    <a href={msg.content} target="_blank" rel="noopener noreferrer">
                                                                        <video controls className="videoPreview">
                                                                            <source src={msg.content} />
                                                                            Trình duyệt của bạn không hỗ trợ video.
                                                                        </video>
                                                                    </a>
                                                                </div>
                                                            ) : (() => {
                                                                const fileInfo = getFileTypeInfo(msg.content);
                                                                return (
                                                                    <div className="fileInfoNotImage" style={{ background: fileInfo.gradient }}>
                                                                        <Image
                                                                            src={fileInfo.icon}
                                                                            alt={fileInfo.description}
                                                                            width={24}
                                                                            height={24}
                                                                            className="fileIconNotImage"
                                                                        />
                                                                        <a href={msg.content} target="_blank" rel="noopener noreferrer" className="fileLinkNotImage">
                                                                            {getFileName(msg.content)}
                                                                        </a>
                                                                    </div>
                                                                );
                                                            })()
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <div ref={bottomRef} />
                                    </div>
                                    <div >
                                        {selectedFiles.length > 0 && (
                                            <div className="filePreview">
                                                {selectedFiles.map((file, index) => (
                                                    <div key={index} className="fileItemWrapper">
                                                        <div className="fileItem">
                                                            <span className="fileName">📁 {file.name}</span>
                                                            <button
                                                                className="removeFileBtn"
                                                                onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== index))}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className='chatContainer'>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
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