import React, { useEffect } from 'react'
import ArchiveStory from '../components/ArchiveStory'
import { useNavigate } from 'react-router-dom'
import storyStore from '../store/storyStore';

const Archive = () => {
    const navigate = useNavigate();
    const setAllArchiveStory = storyStore((state) => state.setAllArchiveStory);
    const allArchiveStory = storyStore((state) => state.allArchiveStory);
    useEffect(() => {
      setAllArchiveStory();
    }, [])
    
    return (
        <div className="second Contaner">
            <div className="mainContainerArchive paddingInTheArchive w-full h-full bg-white">
                <div className="showTitle w-full h-[3.438rem] flex items-center justify-start gap-2">
                    <button onClick={() => navigate(-1)} className='flex items-center justify-center cursor-pointer'>
                        <svg aria-label="Back" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Back</title><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
                    </button>
                    <p className='text-[23px]'>
                        Archive
                    </p>
                </div>
                <div className="showNameContent w-full h-[3.188rem] border-b border-[#dbdbdb] flex items-center justify-center gap-2">
                    <div className="storyTab cursor-pointer w-[4.375rem] h-full flex items-center justify-center gap-2 border-b border-[#000]">
                        <span>
                            <svg aria-label="" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><title></title><path d="M3.915 5.31q.337-.407.713-.779m-3.121 7.855Q1.5 12.194 1.5 12a10.505 10.505 0 0 1 .516-3.265m3.243 11.338a10.55 10.55 0 0 1-2.89-3.864m14.482 5.108a10.547 10.547 0 0 1-8.163.65M12.002 1.5a10.504 10.504 0 0 1 7.925 17.39" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                        </span>
                        <p>STORIES</p>
                    </div>
                </div>
                <div className="showDiscription w-full h-[4.5rem] text-[#737373] text-[12px] flex items-center">Only you can see your archived stories unless you choose to share them.</div>
                <div className="showStoriesContainer w-full flex flex-wrap items-start justify-start gap-3">
                    {
                        allArchiveStory?.map((item, index) => (
                            <ArchiveStory isClick={true} key={index} data={item} index={index} />
                        ))
                    }
                    {
                        allArchiveStory?.length == 0 && <div className="noStory w-full h-full flex items-center justify-center">
                            <p className='text-[#737373] text-[12px]'>No stories archived yet.</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Archive