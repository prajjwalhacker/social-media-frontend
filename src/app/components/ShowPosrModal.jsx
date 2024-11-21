import axios from "axios";

import { useState } from "react";


const ShowPostModal = ({ postObj, setShowPost }) => {



    console.log("postObj");
    console.log(postObj);



    return (
     <>
        <div className="comment-modal-wrapper"></div>
        <div className="comment-modal-container">  
           Hello Show Post
       <button className="model-btn" onClick={() => { setShowPost(false);  }}>Close it</button>
       </div>
      </>
    )
}

export default ShowPostModal;
