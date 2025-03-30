import React, { createContext, useContext, useState } from 'react'

export const StoryStartContext = createContext()

const StoryStartContextProvider = ({ children }) => {
    const [startingIndex, setStartingIndex] = useState(0)
    return (
        <StoryStartContext.Provider value={[startingIndex, setStartingIndex]}>
            {children}
        </StoryStartContext.Provider>
    )
}
export default StoryStartContextProvider

export function useStoryStartContext() {
    return useContext(StoryStartContext)
} 