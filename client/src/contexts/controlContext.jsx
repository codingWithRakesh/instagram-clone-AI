import React, { createContext, useContext, useState } from 'react'

export const ControlContext = createContext()

const ControlContextProvider = ({ children }) => {
    const [control, setControl] = useState(false)
    return (
        <ControlContext.Provider value={[control, setControl]}>
            {children}
        </ControlContext.Provider>
    )
}
export default ControlContextProvider

export function useControl() {
    return useContext(ControlContext)
} 