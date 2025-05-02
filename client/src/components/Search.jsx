import React, { useState } from 'react'
import SearchResult from './SearchResult'
import { useAuthStore } from '../store/authStore.js'

const Search = () => {
    const [searchValue, setSearchValue] = useState("")
    const [showSearch, setShowSearch] = useState([])
    const searchUser = useAuthStore((state) => state.searchUser);
    const serachFunction = async (e) => {
        const values = e.target.value
        setSearchValue(values)
        if (!values) {
            setShowSearch([])
            return
        }
        
        await searchUser(values, setShowSearch)
    }
    return (
        <div className="searchContaner" id="serchBox">
            <div className={`searchDiv ${!showSearch.length ? `hideBorder` : ""}`} id="searchDivId">
                <div className="writeSer">Search</div>
                <div className="search">
                    <div className="logoSer">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className="inputSer">
                        <input value={searchValue} onChange={serachFunction} type="search" name="search" placeholder="Search" id="serchId" autoFocus/>
                    </div>
                </div>
            </div>
            <div className="resuluDiv">
                {!showSearch.length ? <div id="notresult">
                    <div className="reFir">Recent</div>
                    <div className="reSec">No recent searches.</div>
                </div>
                :
                <div id="allResult">
                    {
                        showSearch.map((item, index) => (
                            <SearchResult key={index} value={item}/>
                        ))
                    }
                    {/* <SearchResult/>
                    <SearchResult/>
                    <SearchResult/>
                    <SearchResult/>
                    <SearchResult/> */}
                </div>}
            </div>
        </div>
    )
}

export default Search