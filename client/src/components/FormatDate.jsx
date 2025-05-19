import React from 'react'

const FormatDate = ({ dateString }) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return <>
        <span className='font-bold'>{day}</span>
        <span>{month}</span>
        <span>{year}</span>
    </>
}

export default FormatDate