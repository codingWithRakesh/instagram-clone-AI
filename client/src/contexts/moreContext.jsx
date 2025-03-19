import React, { createContext, useContext, useState } from 'react'

export const MoreContext = createContext()

const MoreContextProvider = ({ children }) => {
    const [more, setMore] = useState(false)
    return (
        <MoreContext.Provider value={[more, setMore]}>
            {children}
        </MoreContext.Provider>
    )
}
export default MoreContextProvider

export function useMore() {
    return useContext(MoreContext)
} 