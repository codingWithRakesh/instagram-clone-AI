import React, { createContext, useContext, useState } from 'react'

export const GetDOBContext = createContext()

const GetDOBContextProvider = ({ children }) => {
    const [getDOB, setGetDOB] = useState("")
    return (
        <GetDOBContext.Provider value={[getDOB, setGetDOB]}>
            {children}
        </GetDOBContext.Provider>
    )
}
export default GetDOBContextProvider

export function usegetDOB() {
    return useContext(GetDOBContext)
} 