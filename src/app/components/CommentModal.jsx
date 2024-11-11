import axios from "axios";
import SparkleCelebration from "./Sparkles";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CommentModal = ({ comments, postId, setShowModel=()=>{}, profileData = {}, fetchPostList }) => {
  console.log("profileData");
  console.log(profileData);

  console.log("postId");
  console.log(postId);

  const [comment, setComment] = useState('');
  const [commentsArr, setCommentsArr] = useState([]);

  useEffect(() => {
    setCommentsArr(comments);
  }, [comments]);

  const onPostComment = async () => {
    const refreshToken = Cookies.get('refreshToken'); 
     try {
      await axios.post('http://localhost:8080/api/commentAddition', {
        comment,
        postId
      },  {
        withCredentials: true, 
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      })
      fetchPostList();
     }
     catch (err) {
       console.log("error");
       console.log(err);
     }
  }

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
        <div className="comment-box-container">
    <textarea className="comment-box" value={comment} onChange={(e) => { setComment(e.target.value); }} placeholder="Write your comment..."></textarea>
    <button className="submit-button" onClick={() => { onPostComment(); }}>Post Comment</button>
    </div>

        <div>
        <div>Previous comments</div>
          {commentsArr.map((item, index) => {
            return (
                <div key={index}>
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
