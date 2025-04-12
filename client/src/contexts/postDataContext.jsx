import React, { createContext, useContext, useState } from 'react'

export const PostDataContext = createContext()

const PostDataContextProvider = ({ children }) => {
    const [postData, setPostData] = useState({
        file: "",
        content: "",
        taggedUsers: []
    })
    return (
        <PostDataContext.Provider value={[postData, setPostData]}>
            {children}
        </PostDataContext.Provider>
    )
}
export default PostDataContextProvider

export function usePostData() {
    return useContext(PostDataContext)
} 