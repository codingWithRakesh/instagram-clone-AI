import {createSlice} from "@reduxjs/toolkit"

const postSlice = createSlice({
    name:"post",
    initialState:{
        userPosts:null,
        userSavedPosts:null,
        userTaggedPosts:null,
        userReelPosts : null,
        allPosts : null
    },
    reducers:{
        // actions
        setPosts:(state,action) => {
            state.userPosts = action.payload;
        },
        setSavedPosts:(state,action) => {
            state.userSavedPosts = action.payload;
        },
        setTaggedPosts:(state,action) => {
            state.userTaggedPosts = action.payload;
        },
        setReelPosts:(state,action) => {
            state.userReelPosts = action.payload;
        },
        setAllPosts : (state, action) => {
            state.allPosts = action.payload;
        }
    }
});
export const {
    setPosts, 
    setSavedPosts, 
    setTaggedPosts,
    setReelPosts,
    setAllPosts
} = postSlice.actions;
export default postSlice.reducer;