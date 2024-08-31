import { useState } from 'react'

import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dasboard from './pages/Dasboard'
import Projects from './pages/Projects'
import NoPageFound from './pages/NoPageFound'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import { useSelector } from 'react-redux'

function App() {
  const [count, setCount] = useState(0)
  const { currentUser } = useSelector((state) => state.user)
  const router = createBrowserRouter([
    {
      path: '/', element: <Header />,
      children: [
        { index: true, element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/sign-in', element: currentUser ? <Navigate to='/' /> : <SignIn /> },
        { path: '/sign-up', element: currentUser ? <Navigate to='/' /> : <SignUp /> },
        {
          element: <PrivateRoute />, children: [
            { path: '/dashboard', element: <Dasboard /> },
          ]
        },
        { path: '/projects', element: <Projects /> },
      ]
    },

    { path: '*', element: <NoPageFound /> },
  ])


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
