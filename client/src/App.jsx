import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { io } from "socket.io-client";
import './App.css';
import './marginPadding.css';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import Search from './components/Search';
import { useSearch } from './contexts/searchContext';
import Notification from './components/Notification';
import { useNotification } from './contexts/notificationContext';
import Upload from './components/Upload';
import { useUpload } from './contexts/uploadContext';
import More from './components/More';
import { useMore } from './contexts/moreContext';
import BlurBox from './components/BlurBox';
import { useSwitch } from './contexts/switchContext';
import LoginBox from './components/LoginBox';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { handleError, handleSuccess } from './components/ErrorMessage';
import { setAuthUser } from './redux/authSlice';
import { useAuthStore } from './store/authStore.js';
import ControlPost from './components/ControlPost.jsx';
import { useControl } from './contexts/controlContext.jsx';
import { useEditPost } from './contexts/editPostContext.jsx';
import { messageStore } from './store/messageStore.js';

function App() {
  const user = useAuthStore((state) => state.user);
  const setSocket = messageStore((state) => state.setSocket);
  // console.log(user)
  const [isNotoficationVisible] = useNotification()
  const [isSerachVisible] = useSearch()
  const [isCreatVisible, setIsCreatVisible] = useUpload()
  const [more] = useMore()
  const [isSwitch, setIsSwitch] = useSwitch()
  const [control, setControl] = useControl()
  const setOnlineUsers = messageStore((state) => state.setOnlineUsers);
  const dispatch = useDispatch()
  const [checktab, setChecktab] = useEditPost()

  const [isUserJoined, setIsUserJoined] = useState(false)
  const fetchAuth = useAuthStore((state) => state.fetchAuth);

  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_CORS_ORIGIN_SERVER, {
      transports: ['websocket'],
    });

    socketRef.current = socket;
    fetchAuth();
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('online-users', (users) => {
      setOnlineUsers(users);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });


    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (user?._id && socketRef.current && !isUserJoined) {
      setIsUserJoined(true)
      socketRef.current.emit('make-id', user._id);
      // console.log("calling...")
    }
  }, [user])

  return (
    user ? <div className="mainContaner">
      <Sidebar />
      <Suspense>
        <Outlet />
      </Suspense>
      {isSerachVisible && <Search />}
      {isNotoficationVisible && <Notification />}
      {isCreatVisible && <BlurBox fun={() => {
        setChecktab({
          value: "take",
          postId: null
        })
        setIsCreatVisible((v) => !v)
      }}><Upload /></BlurBox>}
      {more && <More />}
      {isSwitch && <BlurBox fun={() => setIsSwitch((v) => !v)}> <LoginBox /> </BlurBox>}
      {control.isOn && <BlurBox checkCrose={true} fun={() => { }}>
        <ControlPost />
      </BlurBox>}
      <ToastContainer />
    </div>
      :
      <>
        <Login />
        <ToastContainer />
      </>
  )
}

export default App
