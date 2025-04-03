import { Suspense, useEffect, useMemo, useState } from 'react';
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
import axios from 'axios';
import { handleError, handleSuccess } from './components/ErrorMessage';
import { setAuthUser } from './redux/authSlice';

function App() {
  const { user } = useSelector(store => store.auth);
  console.log(user)
  const [isNotoficationVisible] = useNotification()
  const [isSerachVisible] = useSearch()
  const [isCreatVisible, setIsCreatVisible] = useUpload()
  const [more] = useMore()
  const [isSwitch, setIsSwitch] = useSwitch()
  const [onlineUsers, setOnlineUsers] = useState([]);
  const dispatch = useDispatch()

  const fetchAuth = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/currentUser`,
        {
          withCredentials: true,
        }
      );

      dispatch(setAuthUser(response.data.data))
      // handleSuccess("user fetch Successfully");
      console.log('User Data APP:', response.data.data, response.data.message);
    } catch (error) {
      dispatch(setAuthUser(null))
      console.error('Error:', error.response?.data?.message || error.message);
      handleError(error.response?.data?.message || error.message);
    }
  }

  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_CORS_ORIGIN_SERVER, {
        transports: ["websocket"],
      }),
    []
  );

  useEffect(() => {
    fetchAuth()

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });


    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });


    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    user ? <div className="mainContaner">
      <Sidebar />
      <Suspense>
        <Outlet />
      </Suspense>
      {isSerachVisible && <Search />}
      {isNotoficationVisible && <Notification />}
      {isCreatVisible && <BlurBox fun={() => setIsCreatVisible((v) => !v)}><Upload /></BlurBox>}
      {more && <More />}
      {isSwitch && <BlurBox fun={() => setIsSwitch((v) => !v)}> <LoginBox /> </BlurBox>}
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
