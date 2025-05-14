import React, { createContext, useContext, useState } from 'react'

export const CroseRCContext = createContext()

const CroseRCContextProvider = ({ children }) => {
    const [isCrose, setIsCrose] = useState(false);
    return (
        <CroseRCContext.Provider value={[isCrose, setIsCrose]}>
            {children}
        </CroseRCContext.Provider>
    )
}
export default CroseRCContextProvider

export function useCroseRC() {
    return useContext(CroseRCContext)
}