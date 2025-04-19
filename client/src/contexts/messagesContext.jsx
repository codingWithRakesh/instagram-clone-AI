import React, { createContext, useContext, useState } from 'react'

export const MessagesContext = createContext()

const MessagesContextProvider = ({ children }) => {
    const [messagesChat, setMessagesChat] = useState([])
    return (
        <MessagesContext.Provider value={[messagesChat, setMessagesChat]}>
            {children}
        </MessagesContext.Provider>
    )
}
export default MessagesContextProvider

export function useMessages() {
    return useContext(MessagesContext)
} 