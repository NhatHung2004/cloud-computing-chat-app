'use client';

import React from 'react'
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
import { useState } from 'react';
import { useRouter } from 'next/navigation';



const messagePage = () => {
    const [isOn, setIsOn] = useState(false);
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isSetting, setSetting] = useState(false);

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
                            <span className='nameOption'>Nguyễn Văn B</span>
                            <span className='profileOption' onClick={() => setSetting(false)}>Personal Details</span>
                            <span className='profileOption' onClick={() => setSetting(true)}>Settings</span>
                        </div>
                        <div className='infoOptionContainer'>
                            <div className='infoOptionTitle'>

                                {isSetting ? (
                                    <span className='nameOption myprofileText'>Settings</span>
                                ) : (
                                    <>
                                        {isEditing ? (
                                            <>
                                                <span className='nameOption backIcon' onClick={() => setIsEditing(false)}>&lt;</span>
                                                <span className='nameOption myprofileText'>Edit Profile</span>
                                            </>
                                        ) : (
                                            <span className='nameOption myprofileText'>My Profile</span>
                                        )}
                                        {isEditing ? (
                                            <span className='editMyProfileText' ></span>
                                        ) : (
                                            <span className='editMyProfileText' onClick={() => setIsEditing(true)}>Edit</span>
                                        )}
                                    </>
                                )}
                            </div>
                            {isSetting ? (
                                <span className='editMyProfileText' ></span>
                            ) : (
                                <>
                                    {isEditing ? (
                                        <>
                                            <div className='infoOptionTitle nameRowContainer'>
                                                <div className='columnInfo'>
                                                    <span className='nameOption fnTitleText'>First Name <span className="required">*</span> </span>
                                                    <input className='editInfoInput' placeholder='Nguyễn Văn'></input>
                                                </div>
                                                <div className='columnInfo'>
                                                    <span className='nameOption fnTitleText'>Last Name <span className="required">*</span> </span>
                                                    <input className='editInfoInput' placeholder='B'></input>
                                                </div>
                                            </div>

                                            <div className='infoOptionTitle nameRowContainer'>
                                                <div className='columnInfo'>
                                                    <span className='nameOption fnTitleText'>Email Address</span>
                                                    <input className='editInfoInput' placeholder='nguynVanB@gmail.com'></input>
                                                </div>
                                                <div className='columnInfo'>
                                                    <span className='nameOption fnTitleText'>Date Of Birth <span className="required">*</span> </span>
                                                    <input className='editInfoInput' type='date'></input>
                                                </div>
                                            </div>

                                            <div className='infoOptionTitle nameRowContainer'>
                                                <div className='columnInfo'>
                                                    <span className='nameOption fnTitleText'>Gender</span>
                                                    <select id="gender" className="editInfoInput">
                                                        <option value="MMale">Male</option>
                                                        <option value="FFemale">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='infoOptionTitle nameRowContainer'>
                                                <div className='columnInfo'>
                                                    <span className='nameOption fnTitleText'>First Name</span>
                                                    <span className='nameOption fnText'>Nguyễn Văn</span>
                                                </div>
                                                <div className='columnInfo'>
                                                    <span className='nameOption fnTitleText'>Last Name</span>
                                                    <span className='nameOption fnText'>B</span>
                                                </div>
                                            </div>

                                            <div className='infoOptionTitle nameRowContainer'>
                                                <div className='columnInfo'>
                                                    <span className='nameOption fnTitleText'>Email Adderss</span>
                                                    <span className='nameOption fnText'>nguynVanB@gmail.com</span>
                                                </div>

                                                <div className='columnInfo'>
                                                    <span className='nameOption fnTitleText'>Date of Birth</span>
                                                    <span className='nameOption fnText'>11/05/2000</span>
                                                </div>
                                            </div>

                                            <div className='infoOptionTitle nameRowContainer'>
                                                <div className='columnInfo'>
                                                    <span className='nameOption fnTitleText'>Gender</span>
                                                    <span className='nameOption fnText'>Male</span>
                                                </div>
                                                <div className='columnInfo'>
                                                    <span className='nameOption fnTitleText'>Account Creation Date</span>
                                                    <span className='nameOption fnText'>20/05/2020</span>
                                                </div>
                                            </div>

                                            <div className='infoOptionTitle nameRowContainer'>
                                                <div className='columnInfo'>
                                                    <span className='nameOption fnTitleText'>Uid</span>
                                                    <span className='nameOption fnText'>284782947892</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}

                        </div>
                    </div>
                </div >
            </SidebarInset>
        </SidebarProvider>
    )
}

export default messagePage