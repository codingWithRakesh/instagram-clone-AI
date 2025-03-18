import { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client";
import './App.css';

function App() {
  const [userName, setUserName] = useState("")
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([])

  let chatUserData = new Map()

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

    socket.on("reciveMessage", ({message, receiverId}) => {
      console.log(message, receiverId)
      // setMessages((messages) => [...messages, chatUserData.get(userName)]);
      // chatUserData.set(userName)
      chatUserData.get(receiverId)
      let tmp = [...chatUserData.get(receiverId), { value: message, user: false }]
      chatUserData.set(receiverId,tmp)
      setMessages((messages) => {
        return tmp
      });
    })

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


  const allUsers = [
    { userName: "abc_124" },
    { userName: "mno_567" },
    { userName: "xyz_098" },
    { userName: "jkl_345" },
    { userName: "efg_209" },
  ].map((user) => ({
    ...user,
    isOnline: onlineUsers.includes(user.userName), // Check if the user is online
  }));

  // allUsers.map((v,i) => {
  //   chatUserData.set(v.userName, [])
  // })


  const [message, setMessage] = useState("")
  const submitClick = () => {
    console.log(userName)
    socket.emit("make-id", userName);
  }

  const [clickUserId, setClickUserId] = useState("")
  const setCurrentUser = (value) => {
    setClickUserId(value)
    setMessages((valueMessage) => {
      return chatUserData.get(value)
    });
  }

  const sendMessage = () => {
    socket.emit("message", { message, clickUserId, userName });
    console.log({ message, clickUserId, userName })
    // chatUserData.get(clickUserId)
    let tmp = [...chatUserData.get(clickUserId), { value: message, user: true }]
      chatUserData.set(clickUserId,tmp)
    console.log("data:",chatUserData.get(clickUserId))
    setMessages((valueMessage) => {
      return tmp
    });
    setMessage("")
  }

  return (
    <div className='w-full h-screen text-red-700 bg-red-200 flex items-center justify-around relative'>
      <div className="forInput absolute left-4 top-2">
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className='flex-1 h-[2.5rem] text-black px-3 bg-gray-200 rounded outline-none' />
        <button onClick={submitClick} className='bg-blue-700 text-white px-3 py-2 rounded'>Join</button>
      </div>
      <div className="showContact w-[30%] h-[80%] bg-white rounded py-2">
        {
          allUsers.map((v, i) => (
            <div onClick={() => {setCurrentUser(v.userName)}} key={i} className={`cols w-full h-[4rem] hover:bg-gray-200 hover:cursor-pointer mb-2 flex items-center gap-4 p-4 ${clickUserId == v.userName ? "bg-gray-200" : "bg-white"}`}>
              <div className='h-[3rem] w-[3rem] rounded-full bg-gray-300'></div>
              <p className='text-black'>{v.userName}</p>
              {v.isOnline ? <p className='text-green-700 font-bold'>Online</p>
              :
              <p className='text-red-700 font-bold'>Offline</p>}
            </div>
          ))
        }
      </div>
      <div className="showChat w-[60%] h-[80%] bg-white rounded py-4 relative overflow-hidden">
        <div className='overflow-auto w-full h-[90%]'>
          {
            messages.map((v, i) => (
              <div key={i} className={`chats w-full h-[3rem] hover:bg-gray-200 px-4 flex items-center ${v?.user ? `justify-end` : ""}`}>
                <div className="textMessages bg-blue-500 px-2.5 py-1.5 rounded-3xl text-white">{v.value}</div>
              </div>
            ))
          }
        </div>
        <div className="inputBx absolute gap-3 p-4 left-0 bottom-0 w-full h-[4rem] bg-gray-300 flex items-center justify-center">
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className='flex-1 h-[2.5rem] text-black px-3 bg-gray-200 rounded outline-none' />
          <button onClick={sendMessage} className='bg-blue-700 text-white px-3 py-2 rounded'>Send</button>
        </div>
      </div>
    </div>
  )
}

export default App
