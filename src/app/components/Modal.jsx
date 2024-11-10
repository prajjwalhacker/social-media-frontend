import React, { useState } from 'react'
import MyModal from './ShowModal';

const Modal = ({ profileData = {} }) => {
  const [showModal, setShowModel] = useState(true);
  return (
    <>
     {showModal && <MyModal setShowModel={setShowModel} profileData={profileData}/> }
    </>
  )
}

export default Modal