import React from 'react'

const DefaultBoxProfile = ({ name }) => {
    const svgArray = [
        {
            name: "photo",
            title: "Share Photos",
            content: "When you share photos, they will appear on your profile.",
            svg: <svg aria-label="When you share photos, they will appear on your profile." className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="62" role="img" viewBox="0 0 96 96" width="62"><title>When you share photos, they will appear on your profile.</title><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"></circle><ellipse cx="48.002" cy="49.524" fill="none" rx="10.444" ry="10.476" stroke="currentColor" stroke-linejoin="round" stroke-width="2.095"></ellipse><path d="M63.994 69A8.02 8.02 0 0 0 72 60.968V39.456a8.023 8.023 0 0 0-8.01-8.035h-1.749a4.953 4.953 0 0 1-4.591-3.242C56.61 25.696 54.859 25 52.469 25h-8.983c-2.39 0-4.141.695-5.181 3.178a4.954 4.954 0 0 1-4.592 3.242H32.01a8.024 8.024 0 0 0-8.012 8.035v21.512A8.02 8.02 0 0 0 32.007 69Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
        },
        {
            name: "saved",
            title: "Save",
            content: "Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.",
            svg: <svg aria-label="Save" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="62" role="img" viewBox="0 0 96 96" width="62"><title>Save</title><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M66 68.685 49.006 51.657a1.42 1.42 0 0 0-2.012 0L30 68.685V27h36Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
        },
        {
            name: "tagged",
            title: "Photos of you",
            content: "When people tag you in photos, they'll appear here.",
            svg: <svg aria-label="Photos of you" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="62" role="img" viewBox="0 0 96 96" width="62"><title>Photos of you</title><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M56.826 44.119a8.824 8.824 0 1 1-8.823-8.825 8.823 8.823 0 0 1 8.823 8.825Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"></path><path d="M63.69 67.999a9.038 9.038 0 0 0-9.25-8.998H41.56A9.038 9.038 0 0 0 32.31 68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M48 20.215c-2.94 0-7.125 8.76-11.51 8.785h-4.705A8.785 8.785 0 0 0 23 37.784v22.428a8.785 8.785 0 0 0 8.785 8.785h32.43A8.785 8.785 0 0 0 73 60.212V37.784A8.785 8.785 0 0 0 64.215 29h-4.704c-4.385-.026-8.57-8.785-11.511-8.785Z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2"></path></svg>
        }
    ];

    const selectedItem = svgArray.find(item => item.name === name)

    return (
        <div className='h-[19.3rem] w-[22rem] flex flex-col items-center justify-center gap-2'>
            <div className="scgPart h-[3.875rem] w-[3.875rem]">
                {selectedItem.svg}
            </div>
            <div className="namePartBig text-[1.875rem] font-extrabold">
                {selectedItem.title}
            </div>
            <div className="smallName text-[14px]">
                {selectedItem.content}
            </div>
        </div>
    );
}

export default DefaultBoxProfile;
