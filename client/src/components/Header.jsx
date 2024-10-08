import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { signOutSuccess } from '../store/slices/userSlice';
import { toggleTheme } from '../store/theme/themeslice';
import FooterComp from './Footer';

const Header = () => {
    const path = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user)
    const { theme } = useSelector(state => state.theme)
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
                navigate('/sign-in')
            }
        }
        catch (err) {

        }
    }
    return (
        <>
            <Navbar className='border-b-2'>
                <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>MakeYour</span>Blog</Link>
                <form>
                    <TextInput type='text' placeholder='Search...' rightIcon={AiOutlineSearch} className='hidden lg:inline' />
                </form>
                <Button className='w-12 h-10 lg:hidden' color="gray">
                    <AiOutlineSearch />
                </Button>
                <div className='flex gap-2 md:order-2'>
                    <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                        {theme == 'dark' ? <FaMoon /> : <FaSun />}
                    </Button>
                    {currentUser ? (
                        <Dropdown arrowIcon={false}
                            inline label={<Avatar alt='user' img={currentUser.profilePicture} rounded />}>
                            <Dropdown.Header>
                                <span className='block text-sm'>@{currentUser.username}</span>
                                <span className='block test-sm font-medium truncate'>{currentUser.email}</span>
                            </Dropdown.Header>
                            <Link to="/dashboard?tab=profile">
                                <Dropdown.Item>Profile</Dropdown.Item></Link>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handlleSignOut}>Sign Out</Dropdown.Item>
                        </Dropdown>
                    )
                        :
                        (<Link to='/sign-in'>
                            <Button gradientDuoTone="purpleToBlue" outline>
                                Sign In
                            </Button>
                        </Link>)}
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link active={path.pathname == '/'} as={"div"}>
                        <Link to='/'>Home</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path.pathname == '/about'} as={"div"}>
                        <Link to='/about'>About</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path.pathname == '/projects'} as={"div"}>
                        <Link to='/projects'>Projects</Link>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
            <Outlet />
            <FooterComp />
        </>
    )
}

export default Header