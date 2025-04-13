import React, { createContext, useContext, useState } from 'react'

export const ChatListContext = createContext()

const ChatListContextProvider = ({ children }) => {
    const [chatList, setChatList] = useState([])
    return (
        <ChatListContext.Provider value={[chatList, setChatList]}>
            {children}
        </ChatListContext.Provider>
    )
}
export default ChatListContextProvider

export function useChatList() {
    return useContext(ChatListContext)
} 