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
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import { AuthenticatedUserRoute, ProtectRoute } from './utils/userAuthenticated.jsx'
import ControlContextProvider from './contexts/controlContext.jsx'
import EditPostContextProvider from './contexts/editPostContext.jsx'
import PostDataContextProvider from './contexts/postDataContext.jsx'
import MessageBox from './components/MessageBox.jsx'
import DefaultMessageBox from './components/DefaultMessageBox.jsx'
import ChatListContextProvider from './contexts/chatListContext.jsx'
import MessagesContextProvider from './contexts/messagesContext.jsx'
import MuteContextProvider from './contexts/muteContext.jsx'
import CroseRCContextProvider from './contexts/croseRCContext.jsx'
import StoryOrPostContextProvider from './contexts/storyOrPostContext.jsx'
import StoryContextProvider from './contexts/storyContext.jsx'
import StoryUserContextProvider from './contexts/storyUserContext.jsx'
import UserStoryCheckContextProvider from './contexts/userStoryCheckContext.jsx'
import Archive from './pages/Archive.jsx'
import HighLightContextProvider from './contexts/highLightContext.jsx'

const postShow = {
  path: "p/:pId",
  element: <PostShow />,
}

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <>
            <ProtectRoute>
              <Home />
              <Outlet />
            </ProtectRoute>
          </>
        ),
        children: [postShow]
      },
      {
        path: '/explore',
        element: (
          <>
            <ProtectRoute>
              <Explore />
              <Outlet />
            </ProtectRoute>
          </>
        ),
        children: [postShow]
      },
      {
        path: '/reels/:id',
        element: (
          <ProtectRoute>
            <Reels />
          </ProtectRoute>
        )
      },
      {
        path: '/direct/inbox',
        element: (
          <ProtectRoute>
            <Messages />
          </ProtectRoute>
        ),
        children: [
          {
            path: '',
            element: <DefaultMessageBox />
          }
        ]
      },
      {
        path: '/direct/t/:id',
        element: (
          <ProtectRoute>
            <Messages />
          </ProtectRoute>
        ),
        children: [
          {
            path: '',
            element: <MessageBox />
          }
        ]
      }, ,
      {
        path: '/:profile',
        element: (
          <>
            <ProtectRoute>
              <Profile />
              <Outlet />
            </ProtectRoute>
          </>
        ),
        children: [postShow]
      },
      {
        path: '/accounts/edit',
        element: (
          <ProtectRoute>
            <EditProfile />
          </ProtectRoute>
        )
      },
      {
        path: '/archive/stories',
        element: (
          <ProtectRoute>
            <Archive />
          </ProtectRoute>
        )
      },
      {
        path: '/stories/:userId/:storyId',
        element: (
          <ProtectRoute>
            <StoriesAll />
          </ProtectRoute>
        )
      }
    ]
  },
  {
    path: '/accounts/login',
    element: (
      <AuthenticatedUserRoute>
        <Login />
      </AuthenticatedUserRoute>
    )
  },
  {
    path: '/accounts/emailsignup',
    element: (
      <AuthenticatedUserRoute>
        <Signup />
      </AuthenticatedUserRoute>
    )
  }
]);

let persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HighLightContextProvider>
          <UserStoryCheckContextProvider>
            <StoryUserContextProvider>
              <StoryContextProvider>
                <StoryOrPostContextProvider>
                  <CroseRCContextProvider>
                    <MuteContextProvider>
                      <MessagesContextProvider>
                        <ChatListContextProvider>
                          <PostDataContextProvider>
                            <EditPostContextProvider>
                              <ControlContextProvider>
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
                              </ControlContextProvider>
                            </EditPostContextProvider>
                          </PostDataContextProvider>
                        </ChatListContextProvider>
                      </MessagesContextProvider>
                    </MuteContextProvider>
                  </CroseRCContextProvider>
                </StoryOrPostContextProvider>
              </StoryContextProvider>
            </StoryUserContextProvider>
          </UserStoryCheckContextProvider>
        </HighLightContextProvider>
      </PersistGate>
    </Provider>
    <ToastContainer />
  </StrictMode>
)
