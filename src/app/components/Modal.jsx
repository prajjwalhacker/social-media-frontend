import React, { useEffect, useState } from 'react'
import MyModal from './ShowModal';

const Modal = ({ profileData = {} }) => {
  const [showModal, setShowModel] = useState(true);

  useEffect(() => {
      setShowModel(profileData?.data?.profileData?.userWelcomeModal);
  }, [JSON.stringify(profileData)]);

  console.log("prrr");
  console.log(profileData);

  return (
    <>
     {showModal && <MyModal setShowModel={setShowModel} profileData={profileData}/> }
    </>
  )
}

export default Modal