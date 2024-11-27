import axios from "axios";
import { useEffect, useRef } from "react";
import SparkleCelebration from "./Sparkles";
import { useState } from "react";
import photoI from '../../../public/profile/photo.svg';
import photo2I from '../../../public/profile/photo2.svg';
import photo3I from '../../../public/profile/photo3.svg';
import photo4I from '../../../public/profile/photo4.svg';
import Cookies from 'js-cookie'

const photoIArr = [photoI, photo2I, photo3I, photo4I];

const UploadProfilePicture = ({ setShowProfilePicture=()=>{}, setProfileUrl = ()=>{} }) => {


    const inputRef = useRef(null);

    const onUpload = async (e) => {
       const refreshToken = Cookies.get('refreshToken');
       const file = e.target.files[0];

       const formData = new FormData();
       formData.append('image', file);

       console.log("formData");
       console.log(formData);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/uploadPicture`, formData, {
        withCredentials: true, 
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
        })

        setProfileUrl(response?.data?.url);

    }
 
    return (
     <>
        <div className="profile-modal-wrapper"></div>
        <div className="profile-modal-container">
        <div className="profile-upload" onClick={() =>{
            inputRef.current.click();
        }}>
            Upload Profile Picture 
        </div>
        <input ref={inputRef} type='file' accept="image/*" style={{ display: 'none' }} onChange={(e)=>{
           onUpload(e);
        }}/>
       <button className="model-btn" onClick={() => { setShowProfilePicture(false);  }}>Close it</button>
       </div>
      </>
    )
}

export default UploadProfilePicture;
