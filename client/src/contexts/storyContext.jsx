import React, { createContext, useContext, useState } from 'react'

export const StoryContext = createContext()

const StoryContextProvider = ({ children }) => {
    const [storiesAll, setStoriesAll] = useState([])
    return (
        <StoryContext.Provider value={[storiesAll, setStoriesAll]}>
            {children}
        </StoryContext.Provider>
    )
}
export default StoryContextProvider

export function useStory() {
    return useContext(StoryContext)
} 