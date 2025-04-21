'use client';

import React, { useState, useEffect } from 'react'
import '@/styles/send.css';
import Image from 'next/image';
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { sendMessageApi } from "@/lib/sendmessage";
import { useAllUsers } from "@/hooks/use-getAllUser";
import { useRef } from 'react'

const SendPage = () => {
    const [toEmail, setToEmail] = useState('');
    const [message, setMessage] = useState('');
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isSending, setIsSending] = useState(false);
    const { users, error: userError, isLoading: userLoading } = useAllUsers();
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            setUserEmail(email);
        }
    }, []);


    if (userLoading) return <div>Loading...</div>;
    if (userError) return <div>Error occurred: {userError.message}</div>;
    if (!users || users.length === 0) return <div>No user found.</div>;


    const handleSend1 = async (email: string) => {
        if (isSending) return;
        const userEmailExists = users.some((user) => user.email === email);

        if (!userEmailExists) {
            alert("Người dùng không tồn tại");
            return;
        } else if (userEmail === email) {
            alert("Bạn không thể gửi tin nhắn cho chính mình");
            return;
        } else if (!message.trim() && selectedFiles.length === 0) {
            alert("Vui lòng nhập tin nhắn hoặc đính kèm ít nhất một tệp.");
            return;
        }

        try {
            setIsSending(true);
            const messageResult = await sendMessageApi(toEmail, message.trim(), selectedFiles);
            if (messageResult.success) {
                alert("Gửi tin nhắn thành công!");
                setMessage('');
                setToEmail('');
                setSelectedFiles([]);
            }
        } catch (err) {
            console.error(err);
            alert("Đã có lỗi xảy ra.");
        } finally {
            setIsSending(false);
        }
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click(); // mở File Explorer
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const filesArray = Array.from(files);
            setSelectedFiles(filesArray);
        }
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Header chứa breadcrumb */}
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

                <div className='containerSend'>
                    <div className='insideContainerSend'>
                        <div className='inputContainerSend'>
                            <input type='text'
                                className='inputEmail'
                                placeholder='To : '
                                value={toEmail}
                                onChange={(e) => setToEmail(e.target.value)}
                            ></input>
                            <textarea className='textInput'
                                placeholder='Write something.....'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                            <div className='file_Container'>
                                {selectedFiles.length > 0 && (
                                    <div >
                                        {selectedFiles.map((file, index) => (
                                            <div key={index} className="fileItemWrapper2">
                                                <div className="fileItem2">
                                                    <span className="fileName2">📁 {file.name}</span>
                                                    <button
                                                        className="removeFileBtn2"
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


                        </div>
                        <span className='line'></span>
                        <div className='buttonContainer'>
                            <button className='sendButton'
                                onClick={() => handleSend1(toEmail)}
                                disabled={isSending}
                            >{isSending ? 'Sending...' : 'Send'}</button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <button className='attachButton' onClick={handleButtonClick}>
                                <Image
                                    className='btnIcon'
                                    src="/paper-clip.png"
                                    alt="Next.js logo"
                                    width={25}
                                    height={25}
                                    priority
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default SendPage