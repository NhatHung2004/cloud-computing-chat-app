"use client"

import React from 'react'

import '@/styles/login.css';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const loginPage = () => {
    const router = useRouter();
    return (
        <div className='bg'>
            <div className='boxLogin'>
                <div className='logo'></div>
                <p className='text'>Email</p>
                <input id='email'
                    type='text'
                    className='inputUserName'
                    placeholder="username@gmail.com"
                />

                <p className='text'>Password</p>
                <input id='password'
                    type='password'
                    className='inputUserName'
                    placeholder="Password"
                />

                <Link href="" className='text forgotPassword' >Forgot Password?</Link>
                <div className="btnContainerSingIn" >
                    <button className='btnLogin' onClick={() => router.push('/Message')}>Sign in</button>
                </div>

                <div className="btnContainerFastSingIn">
                    <button className='btnLoginWithAnother'>
                        <Image
                            className='btnIcon'
                            src="/Google.png"
                            alt="Next.js logo"
                            width={25}
                            height={25}
                            priority
                        />
                    </button>
                    <button className='btnLoginWithAnother'>
                        <Image
                            className='btnIcon'
                            src="/GiHub.png"
                            alt="Next.js logo"
                            width={25}
                            height={25}
                            priority
                        />
                    </button>
                    <button className='btnLoginWithAnother'>
                        <Image
                            className='btnIcon'
                            src="/Fb.png"
                            alt="Next.js logo"
                            width={25}
                            height={25}
                            priority
                        />
                    </button>
                </div>
                <div className='btnSignUp'>
                    <p className='text register'>Don't have an account?</p>
                    <Link href={"/register"} className='text register' >Register for free</Link>
                </div>
            </div>
        </div>
    );
}

export default loginPage
