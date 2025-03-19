import React from 'react'
import SearchResult from './SearchResult'

const Search = () => {
    return (
        <div className="searchContaner" id="serchBox">
            <div className="searchDiv hideBorder" id="searchDivId">
                <div className="writeSer">Search</div>
                <div className="search">
                    <div className="logoSer">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className="inputSer">
                        <input type="search" name="search" placeholder="Search" id="serchId" autoFocus/>
                    </div>
                </div>
            </div>
            <div className="resuluDiv">
                <div id="notresult">
                    <div className="reFir">Recent</div>
                    <div className="reSec">No recent searches.</div>
                </div>
                <div id="allResult">
                    <SearchResult/>
                    <SearchResult/>
                    <SearchResult/>
                    <SearchResult/>
                    <SearchResult/>
                </div>
            </div>
        </div>
    )
}

export default Search