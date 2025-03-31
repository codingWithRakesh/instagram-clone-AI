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

function App() {
  const [isNotoficationVisible] = useNotification()
  const [isSerachVisible] = useSearch()
  const [isCreatVisible, setIsCreatVisible] = useUpload()
  const [more] = useMore()
  const [isSwitch, setIsSwitch] = useSwitch()
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useMemo(
    () =>
      io(import.meta.env.VITE_CORS_ORIGIN_SERVER, {
        transports: ["websocket"],
      }),
    []
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("online-users", (users) => {
      setOnlineUsers(users); // Update online users list
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

    return () => {
      socket.disconnect(); // Clean up on unmount
    };
  }, []);
  return (
    <div className="mainContaner">
      <Sidebar />
      <Suspense>
        <Outlet />
      </Suspense>
      {isSerachVisible && <Search />}
      {isNotoficationVisible && <Notification />}
      {isCreatVisible && <BlurBox fun={() => setIsCreatVisible((v) => !v)}><Upload /></BlurBox>}
      {more && <More />}
      {isSwitch && <BlurBox fun={() => setIsSwitch((v) => !v)}> <LoginBox /> </BlurBox>}
    </div>
  )
}

export default App
