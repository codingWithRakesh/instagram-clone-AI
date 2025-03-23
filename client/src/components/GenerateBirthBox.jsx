import React, { useState } from 'react'

const GenerateBirthBox = () => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = Array.from({ length: 2025 - 1919 + 1 }, (_, i) => i + 1919);

    const [selectedMonth, setSelectedMonth] = useState('');

    const daysInMonth = (month) => {
        if (!month) return 31;
        const index = months.indexOf(month);
        return new Date(2024, index + 1, 0).getDate();
    };

    return (
        <div className="birthBox flex flex-col items-center justify-start">
            <div className="inputs w-[17rem] flex items-center justify-center gap-2 h-[2.25rem] forMarginInInput">
                <select name="month" className='w-[5.75rem] rounded-[3px] h-full border border-[#DBDBDB] paddingLeftRightIn text-[#737373]' onChange={(e) => setSelectedMonth(e.target.value)}>
                    <option value="">Month</option>
                    {months.map((month, index) => (
                        <option key={index} value={month}>{month}</option>
                    ))}
                </select>
                <select name="date" className='w-[4rem] rounded-[3px] h-full border border-[#DBDBDB] paddingLeftRightIn text-[#737373]'>
                    <option value="">Date</option>
                    {[...Array(daysInMonth(selectedMonth)).keys()].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                <select name="year" className='w-[4.5rem] h-full rounded-[3px] border border-[#DBDBDB] paddingLeftRightIn text-[#737373]'>
                    <option value="">Year</option>
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <p className='text-[#737373] text-[.90rem]'>You need to enter the date you were born</p>
        </div>
    );
}

export default GenerateBirthBox