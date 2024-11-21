import axios from "axios";
import SparkleCelebration from "./Sparkles";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CommentModal = ({ comments, postId, setShowModel=()=>{}, profileData = {}, fetchPostList }) => {

  const [comment, setComment] = useState('');
  const [commentsArr, setCommentsArr] = useState([]);

  useEffect(() => {
    setCommentsArr(comments);
  }, [comments]);

  const onPostComment = async () => {
    const refreshToken = Cookies.get('refreshToken'); 
     try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/commentAddition`, {
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
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userUpdate`, {
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
    <button className="submit-button" onClick={() => { onPostComment(); setCommentsArr((ele) => { return [...ele, { message: comment }]; }) }}>Post Comment</button>
    </div>
        <div className="comments-list">
        {!commentsArr?.length ? <div>No Previous comments</div> : <div>Previous comments</div> }
        <div className='comments-list-arr'>
           {commentsArr.map((item, index) => {
            return (
                <div className="comment-section" key={index}>
                    {item.message || ""}
                </div>
            )
          })}
        </div>
        </div> 
       <button className="model-btn" onClick={() => { setShowModel(false); userUpdate(); }}>Close it</button>
       </div>
      </>
    )
}

export default CommentModal;
