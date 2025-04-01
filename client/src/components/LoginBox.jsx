import React, { useState } from 'react'
import { useSwitch } from '../contexts/switchContext'
import axios from 'axios';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { handleError, handleSuccess } from './ErrorMessage.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/authSlice.js';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner.jsx';

const LoginBox = () => {
    const [isSwitch] = useSwitch()
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!identifier || !password) {
            handleError('Please enter your username or email and password.');
            return;
        }

        const isEmail = /\S+@\S+\.\S+/.test(identifier);
        const data = isEmail ? { email: identifier, password } : { userName: identifier, password };

        setLoading(true)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/login`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            dispatch(setAuthUser(response.data.data.user));
            handleSuccess(response.data.message);
            setLoading(false)
            navigate("/");
        } catch (error) {
            console.error('Error:', error.response?.data?.message || error.message);
            handleError(error.response?.data?.message || error.message);
        }
    };

    const loginWithFacebook = async (response) => {
        const userData = {
            fullName: response.name,
            email: response.email,
            DOB: response.birthday,
            profilePic: response.picture?.data?.url,
            gender: response.gender
        }
        setLoading(true)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/login`,
                userData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            dispatch(setAuthUser(response.data.data.user));
            handleSuccess(response.data.message);
            setLoading(false)
            navigate("/");
        } catch (error) {
            console.error('Error:', error.response?.data?.message || error.message);
            handleError(error.response?.data?.message || error.message);
        }
    }

    return (
        <div className={`loginRealDiv ${isSwitch ? `rounded-[5px]` : ""} bg-white border border-[#DBDBDB] w-[22rem] h-[26rem] flex flex-col items-center justify-start`}>
            <div className="logoInsta w-full h-[8rem] flex items-center justify-center">
                <i
                    aria-label="Instagram"
                    role="img"
                    style={{
                        backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v4/yB/r/E7m8ZCMOFDS.png")',
                        backgroundPosition: '0px -52px',
                        backgroundSize: 'auto',
                        width: '175px',
                        height: '51px',
                        backgroundRepeat: 'no-repeat',
                        display: 'inline-block',
                    }}
                ></i>
            </div>
            <form onSubmit={handleSubmit} className=" w-full flex flex-col items-center justify-center gap-2">
                <input
                    type="text"
                    className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] h-[2.375rem] forPaddingInputLogin'
                    placeholder='Username or Email'
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                />
                <input
                    type="password"
                    className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] h-[2.375rem] forPaddingInputLogin'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='itemCenterAllhild w-[16.75rem] bg-[#0095F6] hover:bg-[#006bf6] transition-all text-white cursor-pointer buttonLogin'>
                    {loading ? <Spinner /> :`Log in`}
                </button>
            </form>
            <div className="orLogin w-[16.75rem] flex items-center justify-center relative h-[2rem] marginOrLogin">
                <div className="lineLogin w-full h-[1px] bg-[#DBDBDB]"></div>
                <div className="orText absolute bg-white p-4 text-[#737373] w-5 font-bold">OR</div>
            </div>
            <div className="otherLogin flex flex-col items-center justify-center gap-2">
                <div className="asl group cursor-pointer flex items-center justify-center text-[#0095f6] gap-2 font-bold">
                    <svg aria-label="Log in with Facebook" className="x1lliihq x1n2onr6 x173jzuc" fill="currentColor" height="20" role="img" viewBox="0 0 16 16" width="20"><title>Log in with Facebook</title><g clipPath="url(#a)"><path d="M8 0C3.6 0 0 3.6 0 8c0 4 2.9 7.3 6.8 7.9v-5.6h-2V8h2V6.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3V8h2.2l-.4 2.3H9.2v5.6C13.1 15.3 16 12 16 8c0-4.4-3.6-8-8-8Z" fill="currentColor"></path></g><defs><clipPath id="a"><rect fill="currentColor" height="16" width="16"></rect></clipPath></defs></svg>
                    <FacebookLogin
                        appId={import.meta.env.VITE_FACEBOOK_USER}
                        fields="name,email,birthday,picture,gender"
                        scope="public_profile,email,user_birthday,user_gender"
                        onSuccess={(response) => {
                            console.log('Login Success!', response);
                        }}
                        onFail={(error) => {
                            console.log('Login Failed!', error);
                        }}
                        onProfileSuccess={loginWithFacebook}
                        className=" cursor-pointer"
                    />

                </div>
                <div className="shjhd">Forgot password?</div>
            </div>
        </div>
    )
}

export default LoginBox