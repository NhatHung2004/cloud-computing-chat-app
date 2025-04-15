'use client';

import React, { useEffect, useState } from 'react';
import '@/styles/profile.css';
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
import { useRouter } from 'next/navigation';
import { useUser } from "@/hooks/use-getUserById"



const messagePage = () => {
    const [isOn, setIsOn] = useState(false);
    const [isSetting, setSetting] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const id = localStorage.getItem('_id');
        if (id) {
            setUserId(id);
        }
    }, []);

    const { user, error, isLoading } = useUser(userId || "");

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred: {error.message}</div>;
    if (!user) return <div>No user found.</div>;

    const toggleSwitch = () => {
        setIsOn(!isOn);
    };

    const fields = [
        "Username",
        "Email",
        "Gender",
        "Birthdate",
        "Phone Number"
    ];
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
                                        Profile & Settings
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                </header>


                <div className='container2'>
                    <div className='insideContainer2'>
                        <div className='optionProfileContainer'>
                            <div className='pictureCircle'>
                                <Image
                                    className='avatar'
                                    src="/images.jpg"
                                    alt="Next.js logo"
                                    layout="fill"
                                    priority
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <span className='nameOption'>{user?.name}</span>
                            <span className='profileOption' onClick={() => setSetting(false)}>Personal Details</span>
                            <span className='profileOption' onClick={() => setSetting(true)}>Settings</span>
                        </div>
                        <div className='infoOptionContainer'>
                            <div className='infoOptionTitle'>

                                {isSetting ? (
                                    <span className='nameOption myprofileText'>Settings</span>
                                ) : (
                                    <>
                                        <span className='nameOption myprofileText'>My Profile</span>
                                    </>
                                )}
                            </div>
                            <div className='infoOptionTitle nameRowContainer'>
                                <div className='columnInfo'>
                                    <span className='nameOption fnTitleText'>User Name</span>
                                    <span className='nameOption fnText'>{user.name}</span>
                                </div>
                            </div>

                            <div className='infoOptionTitle nameRowContainer'>
                                <div className='columnInfo'>
                                    <span className='nameOption fnTitleText'>Email Adderss</span>
                                    <span className='nameOption fnText'>{user.email}</span>
                                </div>
                            </div>

                            <div className='infoOptionTitle nameRowContainer'>

                                <div className='columnInfo'>
                                    <span className='nameOption fnTitleText'>Account Creation Date</span>
                                    <span className='nameOption fnText'>
                                        {new Date(user.createdAt).toLocaleDateString('vi-VN', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className='infoOptionTitle nameRowContainer'>
                                <div className='columnInfo'>
                                    <span className='nameOption fnTitleText'>Uid</span>
                                    <span className='nameOption fnText'>{user._id}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            </SidebarInset>
        </SidebarProvider>
    )
}

export default messagePage