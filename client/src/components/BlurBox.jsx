import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useControl } from '../contexts/controlContext';

const BlurBox = ({ children,fun, checkCrose }) => {
    const navigate = useNavigate();
    const [control, setControl] = useControl()
    const forNabe = () => {
        navigate(-1)
    }
    return (
        <div className="createBox" id="uploadId">
            <div className="crosIcon" onClick={fun || forNabe}>
                {!checkCrose && <div className="cros">
                    <svg aria-label="Close" className="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Close</title><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
                </div>}
            </div>
            {children}
        </div>
    )
}

export default BlurBox