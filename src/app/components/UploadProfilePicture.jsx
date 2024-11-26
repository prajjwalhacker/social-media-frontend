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

const UploadProfilePicture = ({ setShowProfilePicture=()=>{} }) => {


    const inputRef = useRef(null);

    const onUpload = (e) => {
       console.log("e.target.files");
       console.log(e.target.files);
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
