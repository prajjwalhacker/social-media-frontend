import axios from "axios";
import { useEffect } from "react";
import SparkleCelebration from "./Sparkles";
import { useState } from "react";
import photoI from '../../../public/profile/photo.svg';
import photo2I from '../../../public/profile/photo2.svg';
import photo3I from '../../../public/profile/photo3.svg';
import photo4I from '../../../public/profile/photo4.svg';
import Cookies from 'js-cookie'

const photoIArr = [photoI, photo2I, photo3I, photo4I];

const FollowerList = ({ setShowModel=()=>{}, followers = {} }) => {


    const [followersList, setFollowers] = useState([]);

    useEffect(() => {
       setFollowers(followers);
    }, [JSON.stringify(followers)]);

    return (
     <>
        <div className="comment-modal-wrapper"></div>
        <div className="comment-modal-container">  
          <div>People who Follows</div>
        <div style={{ marginBottom: '10px' }}>
          {followersList.map((item, index) => {
            return (
                <div key={index} className='like-users'>
                     <img src={photoIArr[Math.floor(Math.random() * 4)].src} alt='' width='40px' height='40px'/>
                    {item.username || ""}
                </div>
            )
          })}
        </div> 
       <button className="model-btn" onClick={() => { setShowModel(false);  }}>Close it</button>
       </div>
      </>
    )
}

export default FollowerList;
