import React, { createContext, useContext, useState } from 'react'

export const NextStory2Context = createContext()

const NextStory2ContextProvider = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(2)
    return (
        <NextStory2Context.Provider value={[currentIndex, setCurrentIndex]}>
            {children}
        </NextStory2Context.Provider>
    )
}
export default NextStory2ContextProvider

export function useNextStory2() {
    return useContext(NextStory2Context)
} 