import React, { createContext, useContext, useState } from 'react'

export const StoryUserContext = createContext()

const StoryUserContextProvider = ({ children }) => {
    const [userStoriesAll, setUserStoriesAll] = useState([])
    return (
        <StoryUserContext.Provider value={[userStoriesAll, setUserStoriesAll]}>
            {children}
        </StoryUserContext.Provider>
    )
}
export default StoryUserContextProvider

export function useStoryUser() {
    return useContext(StoryUserContext)
}