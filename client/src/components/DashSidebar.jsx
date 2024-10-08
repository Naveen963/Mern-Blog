import { Sidebar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiArrowSmRight, HiDocumentText, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const DashSidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const [tab, setTab] = useState('')
    const { currentUser } = useSelector(state => state.user)
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl)
            setTab(tabFromUrl)
    }, [location.search])

    const handlleSignOut = async () => {
        try {
            const res = await fetch(`/api/user/signout`, {
                method: 'POST'
            })
            const data = await res.json();
            if (!res.ok) {
            }
            else {
                dispatch(signOutSuccess())
            }
        }
        catch (err) {
        }
    }
    return (
        <Sidebar className='w-full md:w-56 '>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor="dark" as="div">
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && (<Link to="/dashboard?tab=posts">
                        <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as="div">
                            Posts
                        </Sidebar.Item>
                    </Link>)}
                    <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handlleSignOut}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar