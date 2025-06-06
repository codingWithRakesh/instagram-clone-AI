import React, { useEffect } from 'react'
import MessageComeUser from '../components/MessageComeUser'
import DefaultMessageBox from '../components/DefaultMessageBox'
import MessageBox from '../components/MessageBox'
import { Outlet } from 'react-router-dom'
import { useChatList } from '../contexts/chatListContext'
import { messageStore } from '../store/messageStore.js'

const Messages = () => {
  const [chatList, setChatList] = useChatList()
  const getAllMessageUsers = messageStore((state) => state.getAllMessageUsers);
  useEffect(() => {
    getAllMessageUsers(setChatList)
  }, [])
  
  return (
    <div className="messContaner Contaner">
      <div className="message1 displayFlex displayNone">
        <div className="messCon1">
          <div className="wrirmess">
            <div className="leftArow">
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="wrirmess_1">tarapada_9088</div>
            <div className="wrirmess_2">
              <svg aria-label="New message" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>New message</title><path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
            </div>
          </div>
          <div className="messRequ">
            <div className="messRequ_1">Messages</div>
            <div className="messRequ_2">Requests</div>
          </div>
        </div>
        <div className="messCon2">
          {chatList.map((v,i) => (
            <MessageComeUser value={v} key={i} />
          ))}

        </div>

      </div>
      <div className="message2 displayNone displayFlex">
        <Outlet />

      </div>
    </div>
  )
}

export default Messages