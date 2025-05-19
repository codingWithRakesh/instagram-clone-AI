import React, { useEffect, useState } from 'react'
import ArchiveStory from './ArchiveStory'
import { FaCircleCheck, FaRegCircle } from "react-icons/fa6";
import Spinner from './Spinner';
import { useHighLight } from '../contexts/highLightContext';
import storyStore from '../store/storyStore';
import { useParams } from 'react-router-dom';
import { handleError } from './ErrorMessage';

const TakeHighLightStory = ({ controls }) => {
  const [isHighLight, setIsHighLight] = useHighLight()
  const [selectedIndex, setSelectedIndex] = useState(null) // Track only one selected index
  const setAllUnHighLightedStory = storyStore((state) => state.setAllUnHighLightedStory);
  const allUnHighLightedStory = storyStore((state) => state.allUnHighLightedStory);
  const doHighLightStory = storyStore((state) => state.doHighLightStory);
  const setAllHighLightedStory = storyStore((state) => state.setAllHighLightedStory);
  const doUnHighLightStory = storyStore((state) => state.doUnHighLightStory);
  const isLoading = storyStore((state) => state.isLoading);
  const [sendHighLight, setSendHighLight] = controls
  const [storyId, setStoryId] = useState(null);
  const { profile } = useParams();
  useEffect(() => {
    setAllUnHighLightedStory();
  }, [])

  // controls.log("sendHighLight", sendHighLight);

  const handleSelect = (index, item) => {
    // console.log("item", item?.stories?.[0]?._id)
    setStoryId(item?.stories?.[0]?._id);
    // If clicking the already selected item, deselect it
    // Otherwise, select the new one
    setSelectedIndex(selectedIndex === index ? null : index)
  }

  const handleNext = async () => {
    if (selectedIndex === null) {
      handleError("Please select a story");
      return;
    }
    const selectedStory = storyId;
    const updatedHighlight = { ...sendHighLight, storyId: selectedStory };
    setSendHighLight(updatedHighlight);
    // console.log("sendHighLight", updatedHighlight);
    await doHighLightStory(updatedHighlight);
    await setAllHighLightedStory(profile);
    setIsHighLight("");
  };

  return (
    <div className='w-[60rem] h-[42rem] bg-white rounded-2xl overflow-hidden flex flex-col justify-between items-center relative'>
      <div className='w-full h-[2.688rem] border-b border-[#dbdbdb] flex items-center font-bold justify-center'>Stories</div>
      <div className='w-full flex flex-1 flex-wrap items-start justify-start gap-3 selectStoryArchive'>
        {allUnHighLightedStory?.length === 0 ? (
          <div className='w-full h-full flex items-center justify-center text-center text-gray-500 mt-10'>
            No stories available to highlight.
          </div>
        ) : (
          allUnHighLightedStory?.map((item, index) => (
            <div
              className='w-[24%] relative selectBoxCContainer'
              key={index}
              onClick={() => handleSelect(index, item)}
            >
              <ArchiveStory isClick={false} width="full" data={item} />
              <div className='selectDiv absolute bottom-2 right-2 text-blue-600 text-2xl'>
                {selectedIndex === index ? <FaCircleCheck /> : <FaRegCircle />}
              </div>
            </div>
          ))
        )}
      </div>
      <div onClick={allUnHighLightedStory?.length === 0 ? () => { setIsHighLight("") } : handleNext} className='w-full h-[3rem] flex items-center justify-center border-t border-[#dbdbdb] text-[#0095F6] font-bold cursor-pointer'>
        {isLoading ? <Spinner isLoading={true} /> : "Next"}
      </div>
    </div>
  )
}

export default TakeHighLightStory