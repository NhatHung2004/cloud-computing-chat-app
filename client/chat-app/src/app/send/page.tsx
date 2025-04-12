'use client';

import React, { useState, useEffect } from 'react'
import '@/styles/send.css';
import Image from 'next/image';
import { AppSidebar } from "@/components/app-sidebar"
import { NavActions } from "@/components/nav-actions"
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

const userItems = Array.from({ length: 10 }, (_, index) => ({
    avatar: '/avatar.png',
    name: `Nguyen Van B ${index + 1}`,
    textMessage: 'ahjndbajdbjabdhjabdhjabdahjdb',
    time: '5 hour ago'
}));

const sendPage = () => {
    const [toEmail, setToEmail] = useState('');
    const [message, setMessage] = useState('');

    // Hàm xử lý gửi
    const handleSend = async () => {
        const senderEmail = localStorage.getItem('email'); // hoặc bạn lưu state login rồi lấy
        if (!senderEmail) {
            return;
        }

        const payload = {
            senderEmail,
            receiverEmail: toEmail,
            message: message,
        };

        try {
            const response = await fetch("https://cloud-computing-chat-app-production.up.railway.app/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Gửi thành công:", result);
                alert("Đã gửi tin nhắn!");
                setMessage('');
                setToEmail('');
            } else {
                const error = await response.json();
                console.error("Lỗi gửi tin:", error);
                alert("Gửi thất bại!");
            }
        } catch (err) {
            console.error("Lỗi kết nối:", err);
            alert("Không thể kết nối server!");
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Header chứa breadcrumb */}
                <header className="flex h-14 shrink-0 items-center gap-2 ">
                    <div className="flex flex-1 items-center gap-2 px-3 overflow-hidden">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="line-clamp-1" >
                                        Send Message
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className='container'>
                    <div className='insideContainer'>
                        <div className='inputContainer'>
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
                        </div>
                        <span className='line'></span>
                        <div className='buttonContainer'>
                            <button className='sendButton' onClick={handleSend}>Send</button>
                            <button className='attachButton'>
                                <Image
                                    className='btnIcon'
                                    src="/paper-clip.png"
                                    alt="Next.js logo"
                                    width={25}
                                    height={25}
                                    priority
                                />
                            </button>
                            <button className='attachButton'>
                                <Image
                                    className='btnIcon'
                                    src="/picture.png"
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

export default sendPage