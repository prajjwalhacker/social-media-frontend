import axios from "axios";
import SparkleCelebration from "./Sparkles";
import { useState } from "react";

const CommentModal = ({ setShowModel=()=>{}, profileData = {} }) => {
  console.log("profileData");
  console.log(profileData);

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([{ message: "fsdsdf" }, { message: "gfgfdgfsd sdfsd" }]);

  const userUpdate = async ()=> {
     const refreshToken = Cookies.get('refreshToken'); 
     try {
        await axios.post('http://localhost:8080/api/userUpdate', {
          userWelcomeModal: false
        },  {
          withCredentials: true, 
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
      })
     }
     catch (err) {
        console.log("something went wrong");
     }
  }

    return (
     <>
        <div className="comment-modal-wrapper"></div>
        <div className="comment-modal-container">  
        <div className='comment-creation'>
        <textarea value={comment} onChange={(e) => { setComment(e.target.value); }}/>
        <button>Create Comment</button>
        </div>
        <div>
          {comments.map((item) => {
            return (
                <div>
                    {item.message || ""}
                </div>
            )
          })}
        </div> 
       <button className="model-btn" onClick={() => { setShowModel(false); userUpdate(); }}>Close it</button>
       </div>
      </>
    )
}

export default CommentModal;
