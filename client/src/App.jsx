import { useSelector } from 'react-redux'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import About from './pages/About'
import CreatePost from './pages/CreatePost'
import Dasboard from './pages/Dasboard'
import Home from './pages/Home'
import NoPageFound from './pages/NoPageFound'
import PostPage from './pages/PostPage'
import Projects from './pages/Projects'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
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
        {
          element: <AdminPrivateRoute />, children: [
            { path: '/create-post', element: <CreatePost /> }
          ]
        },
        { path: '/projects', element: <Projects /> },
        { path: '/post/:postSlug', element: <PostPage /> },
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
