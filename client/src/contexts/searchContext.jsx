import React, { createContext, useContext, useState } from 'react'

export const SearchContext = createContext()

const SearchContextProvider = ({ children }) => {
    const [isSerachVisible, setIsSerachVisible] = useState(false)
    return (
        <SearchContext.Provider value={[isSerachVisible, setIsSerachVisible]}>
            {children}
        </SearchContext.Provider>
    )
}
export default SearchContextProvider

export function useSearch() {
    return useContext(SearchContext)
} 