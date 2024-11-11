import axios from "axios";
import SparkleCelebration from "./Sparkles";
import Cookies from "js-cookie";

const MyModal = ({ setShowModel=()=>{}, profileData = {} }) => {
  console.log("profileData");
  console.log(profileData);

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
        <SparkleCelebration/>
        <div className="modal-wrapper"></div>
        <div className="modal-container">
        <h2>Welcome to your profile, {profileData?.data?.profileData?.username}! 🎉😊</h2>
        <p>We’re excited to have you! 🚀✨</p>
       <button className="model-btn" onClick={() => { setShowModel(false); userUpdate(); }}>Close it</button>
       </div>
      </>
    )
}

export default MyModal;
