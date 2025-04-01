import React from "react";
import loader from "../assets/gif/loader.gif"

const Spinner = () => {
    return (
        <img src={loader} alt="" className={`h-[1.6rem] w-[1.6rem] object-cover`} />
    );
};

export default Spinner;
