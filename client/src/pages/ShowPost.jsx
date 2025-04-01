import React from 'react'
import profile from '../assets/images/profile.jpeg'
import video from '../assets/videos/videoMin.mp4'
import CommentSolo from '../components/CommentSolo'

const ShowPost = () => {
  const videoCheck = false
  return (
    <div className='bg-white h-[37rem] flex items-center justify-center rounded-tr-[3px] rounded-br-[3px] overflow-hidden'>
      <div className={`imgOrVideo h-full ${!videoCheck ? `w-[38rem]` : ""}`}>
        {!videoCheck ? <img src={profile} alt="" className='h-full w-full object-cover' /> :
        <video src={video} className='h-full w-full object-cover'></video>}
      </div>

      <div className="showLikeComment w-[30rem] h-full flex flex-col align-center justify-between">

        <div className="rowForUser w-full h-[3.75rem] border-b border-[#dbdbdb] flex items-center justify-between paddingNewhsdgh">
          <div className="imageSIde flex items-center justify-center gap-3">
            <div className="imgjdhks h-8 w-8 rounded-full overflow-hidden">
              <img src={profile} className='h-full w-full object-cover' alt="" />
            </div>
            <p className='font-bold'>tarapada_9679</p>
          </div>
          <div className="arrowSide h-[1.5rem] w-[1.5rem] cursor-pointer">
            <svg aria-label="More options" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
          </div>
        </div>

        <div className="forCommentShowOther paddingNewhsdgh flex-1 border-b border-[#dbdbdb] overflow-auto no-scrollbar-container">
          <CommentSolo  />
          <CommentSolo  />
          <CommentSolo  />
          <CommentSolo  />
          <CommentSolo  />
          <CommentSolo  />
          <CommentSolo  />
        </div>

        <div className="likeShowAndDo w-full h-[6.375rem] border-b border-[#dbdbdb] flex flex-col justify-between ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg aria-label="Like" className="x1lliihq x1n2onr6 cursor-pointer" color="rgb(38, 38, 38)"
                fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24">
                <title>Like</title>
                <path
                  d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
                </path>
              </svg>
              <svg aria-label="Comment" className="x1lliihq x1n2onr6 cursor-pointer" color="rgb(0, 0, 0)"
                fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                <title>Comment</title>
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none"
                  stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div className="">
              <svg aria-label="Save" className="x1lliihq x1n2onr6 cursor-pointer" color="rgb(0, 0, 0)"
                fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                <title>Save</title>
                <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2"></polygon>
              </svg>
            </div>
          </div>
          <div className="sjjsdhjadh leading-tight">
            <p>Liked by <span className='font-bold cursor-pointer'>me_sujoy__</span> and <span className='font-bold cursor-pointer'>23 others</span></p>
            <p className='text-[#737373] text-[14px] cursor-pointer'>March 14</p>
          </div>
        </div>

        <div className="doComment w-full h-[3.313rem] border-b border-[#dbdbdb] flex items-center justify-between">
          <div className="emojiJHD h-[3.3rem] w-[3.3rem] flex items-center justify-center cursor-pointer">
            <svg aria-label="Emoji" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
          </div>
          <div className="inputBOxCo flex-1">
            <input type="text" className='w-full outline-none' placeholder='Add a comment...' />
          </div>
          <div className="postButtonadg h-[3.3rem] w-[3.8rem] flex items-center justify-center cursor-pointer">
            <button>Post</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ShowPost