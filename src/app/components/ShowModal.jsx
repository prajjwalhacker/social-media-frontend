import SparkleCelebration from "./Sparkles";

const MyModal = ({ setShowModel=()=>{}, profileData = {} }) => {
  console.log("profileData");
  console.log(profileData);
    return (
     <>
        <SparkleCelebration/>
        <div className="modal-wrapper"></div>
        <div className="modal-container">
        <h2>Welcome to your profile, {profileData?.data?.profileData?.username}! 🎉😊</h2>
        <p>We’re excited to have you! 🚀✨</p>
       <button className="model-btn" onClick={() => { setShowModel(false); }}>Close it</button>
       </div>
      </>
    )
}

export default MyModal;
