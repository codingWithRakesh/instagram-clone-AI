import React, { createContext, useContext, useState } from 'react'

export const NextStoryContext = createContext()

const NextStoryContextProvider = ({ children }) => {
    const [isNextStory, setIsNextStory] = useState(0)
    return (
        <NextStoryContext.Provider value={[isNextStory, setIsNextStory]}>
            {children}
        </NextStoryContext.Provider>
    )
}
export default NextStoryContextProvider

export function useNextStory() {
    return useContext(NextStoryContext)
} 