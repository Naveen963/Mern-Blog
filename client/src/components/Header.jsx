import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Button, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'

const Header = () => {
    const path = useLocation();
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
                    <Button className='w-12 h-10 hidden sm:inline' color='gray' pill >
                        <FaMoon />
                    </Button>
                    <Link tp='/sign-in'>
                        <Button gradientDuoTone="purpleToBlue" outline>
                            Sign In
                        </Button>
                    </Link>
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
        </>
    )
}

export default Header