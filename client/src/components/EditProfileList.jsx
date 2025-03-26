import React from 'react'

const EditProfileList = () => {
    return (
        <div className="listS flex gap-3 bg-[#EFEFEF]">
            <span className='iconStyleSetting'>
                <svg
                    aria-label="Profile Icon"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="img"
                >
                    <circle
                        cx="12.004"
                        cy="12.004"
                        r="10.5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                    />
                    <path
                        d="M18.793 20.014a6.08 6.08 0 0 0-1.778-2.447 3.991 3.991 0 0 0-2.386-.791H9.38a3.994 3.994 0 0 0-2.386.791 6.09 6.09 0 0 0-1.779 2.447"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                    />
                    <circle
                        cx="12.006"
                        cy="9.718"
                        r="4.109"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                    />
                </svg>
            </span>
            <p>Edit profile</p>
        </div>
    )
}

export default EditProfileList