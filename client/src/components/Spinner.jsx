import React from "react";
import loader from "../assets/gif/loader.gif"
import loader2 from "../assets/gif/loader2.gif"

const Spinner = ({isLoading}) => {
    return (
        <img src={isLoading ? loader2 : loader} alt="" className={`${isLoading ? 'h-[3.6rem] w-[3.6rem]' : 'h-[1.6rem] w-[1.6rem]'} object-cover`} />
    );
};

export default Spinner;
