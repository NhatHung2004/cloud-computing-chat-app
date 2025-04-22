"use client"

import '@/styles/login.css';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import React from 'react';
import { auth, provider, signInWithPopup } from '@/lib/firebaseConfig';
import { Apis, USER_ENDPOINTS } from '@/configs/Apis';

const LoginPage = () => {
    const router = useRouter();

    const handleGoogleLogin = async () => {
        try {

            provider.setCustomParameters({
                prompt: 'select_account', // Mở hộp thoại chọn tài khoản
            });

            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const photoURL = user.photoURL;

            const email = user.email;
            const name = user.displayName;

            console.log('Email:', email);
            console.log('Username:', name);

            const res = await Apis.post(USER_ENDPOINTS.create, {
                email,
                name
            });

            //Những thứ của người dùng hiện tại 
            const data = await res.data;
            localStorage.setItem('_id', data._id);
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            localStorage.setItem('photoURL', photoURL ? photoURL : '');
            console.log('User data saved:', localStorage.getItem('_id'), localStorage.getItem('username'), localStorage.getItem('email'));

            router.push('/message');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Đăng nhập bằng Google thất bại');
        }
    };


    return (
        <div className='bg'>
            <p className='text'>Get started!</p>
            <p className='text introduce'>Welcome to message app. Start for free to send your messages and files!</p>
            <button className='btnLoginWithAnother' onClick={handleGoogleLogin}>
                <Image
                    className='btnIcon'
                    src="/Google.png"
                    alt="Google icon"
                    width={25}
                    height={25}
                    priority
                />
                <p>Login with your Google</p>
            </button>
        </div >
    );
}

export default LoginPage
