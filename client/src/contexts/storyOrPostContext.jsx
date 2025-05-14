import React, { createContext, useContext, useState } from 'react'

export const StoryOrPostContext = createContext()

const StoryOrPostContextProvider = ({ children }) => {
    const [isStoryOrPost, setIsStoryOrPost] = useState("post")
    return (
        <StoryOrPostContext.Provider value={[isStoryOrPost, setIsStoryOrPost]}>
            {children}
        </StoryOrPostContext.Provider>
    )
}
export default StoryOrPostContextProvider

export function useStoryOrPost() {
    return useContext(StoryOrPostContext)
} 