import React, { createContext, useContext, useState } from 'react'

export const UserStoryCheckContext = createContext()

const UserStoryCheckContextProvider = ({ children }) => {
    const [userStoryCheck, setUserStoryCheck] = useState(false)
    return (
        <UserStoryCheckContext.Provider value={[userStoryCheck, setUserStoryCheck]}>
            {children}
        </UserStoryCheckContext.Provider>
    )
}
export default UserStoryCheckContextProvider

export function useStoryUserCheck() {
    return useContext(UserStoryCheckContext)
}