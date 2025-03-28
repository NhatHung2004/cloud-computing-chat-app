'use client';

import React from 'react';
import '@/styles/message.css';
import Image from 'next/image';
import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";
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
                                    {userItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="userItem"
                                            onClick={() => setSelectedUser(index)}
                                        >
                                            <Image
                                                src={item.avatar}
                                                alt={`${item.name} icon`}
                                                width={40}
                                                height={40}
                                                className="userAvt"
                                            />
                                            <div className="textPart">
                                                <span className="userName">{item.name}</span>
                                                <span className="userMessage">{item.textMessage}</span>
                                            </div>
                                            <span className="userTime">{item.time}</span>
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
                                    ? userItems[selectedUser].textMessage
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
