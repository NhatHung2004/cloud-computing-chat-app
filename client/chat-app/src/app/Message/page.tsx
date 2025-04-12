'use client';

import React, { useEffect, useState } from 'react';
import '@/styles/message.css';
import Image from 'next/image';
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

    useEffect(() => {
        const id = localStorage.getItem('_id');
        if (id) {
            setUserId(id);
        }
    }, []);

    const { messages, error, isLoading } = useMessages(userId || "");

    const { sent_messages, error: sentM_Error, isLoading: sentM_Loading } = useSentMessages(userId || "");

    const { users, error: userError, isLoading: userLoading } = useAllUsers();

    const allMessages = [...(messages || []), ...(sent_messages || [])];


    if (isLoading || userLoading || sentM_Loading) return <div>Loading...</div>;
    if (error || userError || sentM_Error) return <div>Error occurred: {error.message}</div>;
    if (!messages || !users || !sent_messages) return <div>No user found.</div>;

    // Hàm để tìm tên người dùng từ email
    const getUserNameByEmail = (email: string) => {
        const user = users.find(u => u.email === email);
        return user ? user.name : email; // Nếu không tìm thấy user, trả về email
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
                                <input className="searhBox" type="text" placeholder="🔍 Search" />
                                <div className="userItemContainer">
                                    {allMessages.map((item, index) => (
                                        <div
                                            key={index}
                                            className="userItem"
                                            onClick={() => setSelectedUser(index)}
                                        >
                                            {/* <Image
                                                src={item.avatar}
                                                alt={`${item.name} icon`}
                                                width={40}
                                                height={40}
                                                className="userAvt"
                                            /> */}
                                            <div className="textPart">
                                                <span className="userName">{getUserNameByEmail(item.senderEmail)}</span>
                                                <span className="userMessage">{item.message}</span>
                                            </div>
                                            <span className="userTime">{item.createdAt}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {(!isMobile || selectedUser !== null) && (
                        <div className="messageContainer">
                            {isMobile && (
                                <button
                                    className="mobileBackButton"
                                    onClick={() => setSelectedUser(null)}
                                >
                                    ← Back
                                </button>
                            )}
                            <div>
                                {selectedUser !== null
                                    ? messages[0].message
                                    : "Chọn một người dùng để xem tin nhắn"}
                            </div>
                        </div>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default MessagePage;
