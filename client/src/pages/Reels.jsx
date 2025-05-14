import React, { useCallback, useEffect, useRef, useState } from 'react'
import Reel from '../components/Reel'
import { postStore } from '../store/postStore.js';

const Reels = () => {
    const setAllReelsPage = postStore((state) => state.setAllReelsPage);
    const allReelsPage = postStore((state) => state.allReelsPage);
    const [currentReelId, setCurrentReelId] = useState(null);
    const reelsBoxRef = useRef(null);
    // const [isCrose, setIsCrose] = useState(false);

    useEffect(() => {
        setAllReelsPage();
    }, []);

    // Wait for data to load before setting initial reel ID
    useEffect(() => {
        if (allReelsPage.length > 0 && !currentReelId) {
            setCurrentReelId(allReelsPage[0]._id);
        }
    }, [allReelsPage]);

    const reelData = React.useMemo(() => [...allReelsPage], [allReelsPage]);
    
    const GlobalStyles = () => {
        return (
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    ::-webkit-scrollbar {
                        width: 1px;
                    }
                    ::-webkit-scrollbar-track {
                        background: #fff;
                    }
                    `,
                }}
            />
        );
    };

    const handleScroll = (e) => {
        const container = reelsBoxRef.current;
        if (!container) return;
        // setIsCrose(false);

        const containerHeight = container.clientHeight;
        const scrollPosition = container.scrollTop;
        const reelIndex = Math.round(scrollPosition / containerHeight);

        if (reelIndex >= 0 && reelIndex < reelData.length) {
            setCurrentReelId(reelData[reelIndex]._id);
        }
    };

    const handleKeyDown = (e) => {
        const currentIndex = reelData.findIndex(reel => reel._id === currentReelId);
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = Math.min(currentIndex + 1, reelData.length - 1);
            setCurrentReelId(reelData[nextIndex]._id);
            scrollToReel(nextIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = Math.max(currentIndex - 1, 0);
            setCurrentReelId(reelData[prevIndex]._id);
            scrollToReel(prevIndex);
        }
    };

    const scrollToReel = (index) => {
        const container = reelsBoxRef.current;
        if (container) {
            container.scrollTo({
                top: index * container.clientHeight,
                behavior: 'smooth'
            });
        }
    };

    // console.log("this is for check it working", isShow)

    return (
        <div
            className="second Contaner forReels"
            onKeyDown={handleKeyDown}
            tabIndex="0"
        >
            <GlobalStyles />
            <div
                className="reelsBox"
                ref={reelsBoxRef}
                onScroll={handleScroll}
                style={{
                    height: '100vh',
                    overflowY: 'scroll',
                    scrollSnapType: 'y mandatory'
                }}
            >
                {reelData.map((reel) => (
                    <Reel
                        id={reel._id}
                        valueReel={reel}
                        isActive={reel._id === currentReelId}
                        key={reel._id}
                    />
                ))}
            </div>
        </div>
    )
}

export default Reels