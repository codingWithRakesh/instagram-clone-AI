import React from 'react'
import userNotPhoto from "../assets/images/profileNot.jpg"

const SendMessage = ({sendUser,message,imageP}) => {
  return (
    <>
        {
            sendUser ? (
                <div className="chatPro_1 justifyStart">
                    <div className="jbsdvjargh">
                        <div className="chatPro_1Pro">
                            <img src={imageP ? imageP : userNotPhoto} alt="" />
                        </div>
                    </div>
                    <div className="messageChat BR_LR_S leftCh_color">
                        {message}
                    </div>
                </div>
            )
            : 
            (
                <div className="chatPro_1 justifyEnd">
                    <div className="messageChat BR_R_B rightCh_color">
                        {message}
                    </div>
                </div>
            )
        }
    </>
  )
}

export default SendMessage