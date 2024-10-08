import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toast } from "flowbite-react";
import { FaExclamationCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../store/slices/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const { loading, error: errorMessage } = useSelector(state => state.user)

    const handleFormData = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.password || !formData.email) {
            return dispatch(signInFailure('Please fill out all fields'))
        }
        try {
            dispatch(signInStart())
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();
            if (data.success == false) {
                dispatch(signInFailure(data.message))
            }
            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/')
            }
        }
        catch (err) {
            dispatch(signInFailure(err.message))
        }
    }

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                {/* left side */}
                <div className='flex-1'>
                    <Link to='/' className='font-bold dark:text-white text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>MakeYour</span>Blog
                    </Link>
                    <p className="text-sm mt-5">
                        Make your own blogs and share your thoughts to everyone by signing in.
                    </p>
                </div>
                {/* right side */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="">
                            <Label value='Email' htmlFor="email" />
                            <TextInput type="email" placeholder="name@company.com"
                                id="email" onChange={handleFormData} />
                        </div>
                        <div className="">
                            <Label value='Password' htmlFor="password" />
                            <TextInput type="password" placeholder="************"
                                id="password" onChange={handleFormData} />
                        </div>
                        <Button gradientDuoTone="purpleToPink" type='submit' disabled={loading} >
                            {loading ? (
                                <>
                                    <Spinner size="sm" />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : 'Sign In'}</Button>
                        <OAuth />
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Don't have an account?</span>
                        <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
                    </div>
                    {
                        errorMessage && (
                            <Toast className='mt-5 dark:bg-red-500 bg-gray-500 text-white'>
                                <FaExclamationCircle className="h-5 w-5" />
                                <div className="pl-4 text-sm font-normal">{errorMessage}</div>
                            </Toast>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SignIn