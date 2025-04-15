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

const sendPage = () => {
    const [toEmail, setToEmail] = useState('');
    const [message, setMessage] = useState('');
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            setUserEmail(email);
        }
    }, []);

    const handleSend = async (email: String) => {
        if (userEmail !== email) {
            const result = await sendMessageApi(toEmail, message);
            if (result.success) {
                alert("Gửi thành công");
                setMessage('');
                setToEmail('');
            } else {
                alert(result.error);
            }
        }
        else {
            alert("Bạn không thể gửi tin nhắn cho chính mình");
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
                            <button className='sendButton' onClick={() => handleSend(toEmail)}>Send</button>
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