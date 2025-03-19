import React, { createContext, useContext, useState } from 'react'

export const NotificationContext = createContext()

const NotificationContextProvider = ({ children }) => {
    const [isNotoficationVisible, setIsNotoficationVisible] = useState(false)
    return (
        <NotificationContext.Provider value={[isNotoficationVisible, setIsNotoficationVisible]}>
            {children}
        </NotificationContext.Provider>
    )
}
export default NotificationContextProvider

export function useNotification() {
    return useContext(NotificationContext)
} 