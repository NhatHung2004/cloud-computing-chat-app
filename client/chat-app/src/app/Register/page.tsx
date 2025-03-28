import React from 'react'
import '@/styles/register.css';
import Link from 'next/link';

const registerPage = () => {
    return (
        <div className='bg2'>
            <div className='halfBg'>
                <p className='textSignUp'>Create an account</p>
                <p className='textLabel'>UserName</p>
                <input id='userNameSignUp'
                    type='text'
                    className='inputUserNameSignUp'
                />

                <p className='textLabel'>Email</p>
                <input id='emailSignUp'
                    type='email'
                    className='inputUserNameSignUp'
                />

                <p className='textLabel'>Password</p>
                <input id='passwordSignUp'
                    type='password'
                    className='inputUserNameSignUp'
                />
                <button className='btnCreate'>Sign Up</button>
                <div className='groupText'>
                    <p className='textLabel text2'>Already have an account?</p>
                    <Link href={"/Login"} className='textLabel text2' >Sign In</Link>
                </div>

            </div>

        </div>
    )
}
export default registerPage
