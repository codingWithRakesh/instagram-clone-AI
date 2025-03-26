import React, { createContext, useContext, useState } from 'react'

export const SwitchContext = createContext()

const SwitchContextProvider = ({ children }) => {
    const [isSwitch, setIsSwitch] = useState(false)
    return (
        <SwitchContext.Provider value={[isSwitch, setIsSwitch]}>
            {children}
        </SwitchContext.Provider>
    )
}
export default SwitchContextProvider

export function useSwitch() {
    return useContext(SwitchContext)
} 