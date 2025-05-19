import React, { createContext, useContext, useState } from 'react'

export const HighLightContext = createContext()

const HighLightContextProvider = ({ children }) => {
    const [isHighLight, setIsHighLight] = useState("");
    return (
        <HighLightContext.Provider value={[isHighLight, setIsHighLight]}>
            {children}
        </HighLightContext.Provider>
    )
}
export default HighLightContextProvider

export function useHighLight() {
    return useContext(HighLightContext)
}