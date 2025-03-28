'use client';

import React from 'react'
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
                            <input type='text' className='inputEmail' placeholder='To : '></input>
                            <textarea className='textInput' placeholder='Write something.....'></textarea>
                        </div>
                        <span className='line'></span>
                        <div className='buttonContainer'>
                            <button className='sendButton'>Send</button>
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