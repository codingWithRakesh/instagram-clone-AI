import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './media.css'
import App from './App.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import Reels from './pages/Reels.jsx'
import Messages from './pages/Messages.jsx'
import Profile from './pages/Profile.jsx'
import Error from './pages/Error.jsx'
import SearchContextProvider from './contexts/searchContext.jsx'
import NotificationContextProvider from './contexts/notificationContext.jsx'
import UploadContextProvider from './contexts/uploadContext.jsx'
import MoreContextProvider from './contexts/moreContext.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import EditProfile from './pages/EditProfile.jsx'
import SwitchContextProvider from './contexts/switchContext.jsx'
import ShowPost from './pages/ShowPost.jsx'
import BlurBox from './components/BlurBox.jsx'
import PostShow from './components/PostShow.jsx'
import Stories from './pages/Stories.jsx'
import StoriesAll from './pages/Stories.jsx'
import NextStoryContextProvider from './contexts/nextStoryContext.jsx'
import SignUpContextProvider from './contexts/signUpDivContext.jsx'
import NextStory2ContextProvider from './contexts/nextStory2Context.jsx'
import StoryStartContextProvider from './contexts/storyStartContext.jsx'
import GetDOBContextProvider from './contexts/getDOBContext.jsx'
let user = false

const postShow = {
  path: "p/:pId",
  element: <PostShow />,
}

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: user ? <App /> : <Login />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Home />
            <Outlet />
          </>
        ),
        children: [postShow]
      },
      {
        path: '/explore',
        element: (
          <>
            <Explore />
            <Outlet />
          </>
        ),
        children: [postShow]
      },
      {
        path: '/reels',
        element: (
          <Reels />
        )
      },
      {
        path: '/direct/inbox',
        element: (
          <Messages />
        )
      },
      {
        path: '/:profile',
        element: (
          <>
            <Profile />
            <Outlet />
          </>
        ),
        children: [postShow]
      },
      {
        path: '/accounts/edit',
        element: (
          <EditProfile />
        )
      }
    ]
  },
  {
    path: '/stories/:userId/:storyId',
    element: <StoriesAll />
  },
  {
    path: '/accounts/login',
    element: (
      <Login />
    )
  },
  {
    path: '/accounts/emailsignup',
    element: (
      <Signup />
    )
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GetDOBContextProvider>
      <StoryStartContextProvider>
        <NextStory2ContextProvider>
          <SignUpContextProvider>
            <NextStoryContextProvider>
              <SwitchContextProvider>
                <MoreContextProvider>
                  <SearchContextProvider>
                    <UploadContextProvider>
                      <NotificationContextProvider>
                        <RouterProvider router={router} />
                      </NotificationContextProvider>
                    </UploadContextProvider>
                  </SearchContextProvider>
                </MoreContextProvider>
              </SwitchContextProvider>
            </NextStoryContextProvider>
          </SignUpContextProvider>
        </NextStory2ContextProvider>
      </StoryStartContextProvider>
    </GetDOBContextProvider>
  </StrictMode>
)
