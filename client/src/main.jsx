import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './media.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
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

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Home />
        )
      },
      {
        path: '/explore',
        element: (
          <Explore />
        )
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
          <Profile />
        )
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MoreContextProvider>
      <SearchContextProvider>
        <UploadContextProvider>
          <NotificationContextProvider>
            <RouterProvider router={router} />
          </NotificationContextProvider>
        </UploadContextProvider>
      </SearchContextProvider>
    </MoreContextProvider>
  </StrictMode>
)
