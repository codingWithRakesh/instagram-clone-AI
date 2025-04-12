import React, { createContext, useContext, useState } from 'react'

export const EditPostContext = createContext()

const EditPostContextProvider = ({ children }) => {
    const [checktab, setChecktab] = useState({
        value : "take",
        postId : null
    })
    return (
        <EditPostContext.Provider value={[checktab, setChecktab]}>
            {children}
        </EditPostContext.Provider>
    )
}
export default EditPostContextProvider

export function useEditPost() {
    return useContext(EditPostContext)
} 