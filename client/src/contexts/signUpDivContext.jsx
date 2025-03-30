import React, { createContext, useContext, useState } from 'react'

export const SignUpContext = createContext()

const SignUpContextProvider = ({ children }) => {
    const [isSignUp, setIsSignUp] = useState("input")
    return (
        <SignUpContext.Provider value={[isSignUp, setIsSignUp]}>
            {children}
        </SignUpContext.Provider>
    )
}
export default SignUpContextProvider

export function useSignUp() {
    return useContext(SignUpContext)
} 