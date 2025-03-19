import React from 'react'
import profile from "../assets/images/profile.jpeg"

const Post = () => {
    return (
        <div className="postContent">
            <div className="post1">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                    <div className="profilePost">
                        <img src={profile} alt="" />
                    </div>
                    <div className="wirteProPost">
                        <p>
                            <span className="bold">tarapada_90</span>
                            {/* <svg>
                        <path
                          d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                          fillRule="evenodd"></path>
                        </svg> */}
                            .
                            <span>1h</span>
                        </p>
                        {/* <p>Original audio</p> */}
                    </div>
                </div>
                <div className="iconPost">
                    <svg aria-label="More options" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)"
                        height="24" role="img" viewBox="0 0 24 24" width="24">
                        <circle cx="12" cy="12" r="1.5"></circle>
                        <circle cx="6" cy="12" r="1.5"></circle>
                        <circle cx="18" cy="12" r="1.5"></circle>
                    </svg>
                </div>
            </div>
            <div className="post2">
                <img src={profile} alt="" />
            </div>
            <div className="post3">
                <div className="three">
                    <svg aria-label="Like" className="x1lliihq x1n2onr6" color="rgb(38, 38, 38)"
                        fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <title>Like</title>
                        <path
                            d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
                        </path>
                    </svg>
                    <svg aria-label="Comment" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)"
                        fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <title>Comment</title>
                        <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none"
                            stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    <svg aria-label="Share Post" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)"
                        fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <title>Share Post</title>
                        <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"
                            x1="22" x2="9.218" y1="3" y2="10.083"></line>
                        <polygon fill="none"
                            points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                            stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
                    </svg>
                </div>
                <div className="one">
                    <svg aria-label="Save" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)"
                        fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <title>Save</title>
                        <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                            stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2"></polygon>
                    </svg>
                </div>
            </div>
            <div className="post4 bold">
                1,183 likes
            </div>
            <div className="post5">
                <p>
                    <span className="bold h">tarapada_90</span> <span> </span> <span>hello everyone this is my
                        first image for instagram</span>
                </p>
                <p className="nameUs">more</p>
            </div>
            <div className="post6">
                <p className="nameUs">View all comments</p>
                <div className="commentDiv">
                    <input type="text" id="commentsId" name="Comment" placeholder="Add a comment…" />
                    <label htmlFor="commentsId">Post</label>
                </div>
            </div>
        </div>
    )
}

export default Post