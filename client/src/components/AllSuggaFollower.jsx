import React from 'react'
import SuggaFollower from './SuggaFollower'
import { useAuthStore } from '../store/authStore.js';
import { useEffect } from 'react';

const AllSuggaFollower = () => {
    const setAllSuggestedUser = useAuthStore((state) => state.setAllSuggestedUser);
    const allSuggestedUser = useAuthStore((state) => state.allSuggestedUser);
    useEffect(() => {
      setAllSuggestedUser();
    }, [setAllSuggestedUser]);

    return (
        <div className="suggaFollo">
            {allSuggestedUser.map((user,index) => (
                <SuggaFollower key={index} user={user} />
            ))}
        </div>
    )
}

export default AllSuggaFollower