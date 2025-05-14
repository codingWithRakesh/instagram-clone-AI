import React, { createContext, useContext, useState } from 'react'

export const MuteContext = createContext()

const MuteContextProvider = ({ children }) => {
    const [doMute, setDoMute] = useState(true)
    return (
        <MuteContext.Provider value={[doMute, setDoMute]}>
            {children}
        </MuteContext.Provider>
    )
}
export default MuteContextProvider

export function useMute() {
    return useContext(MuteContext)
}