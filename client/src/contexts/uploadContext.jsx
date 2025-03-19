import React, { createContext, useContext, useState } from 'react'

export const UploadContext = createContext()

const UploadContextProvider = ({ children }) => {
    const [isCreatVisible, setIsCreatVisible] = useState(false)
    return (
        <UploadContext.Provider value={[isCreatVisible, setIsCreatVisible]}>
            {children}
        </UploadContext.Provider>
    )
}
export default UploadContextProvider

export function useUpload() {
    return useContext(UploadContext)
} 