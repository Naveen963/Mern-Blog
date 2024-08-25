import { useState } from 'react'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dasboard from './pages/Dasboard'
import Projects from './pages/Projects'
import NoPageFound from './pages/NoPageFound'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/dashboard', element: <Dasboard /> },
    { path: '/projects', element: <Projects /> },
    { path: '*', element: <NoPageFound /> },
  ])


  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
