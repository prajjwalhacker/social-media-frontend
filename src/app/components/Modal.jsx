import React, { useState } from 'react'
import MyModal from './ShowModal';

const Modal = () => {
  const [showModal, setShowModel] = useState(true);
  return (
    <>
     {showModal && <MyModal setShowModel={setShowModel}/> }
    </>
  )
}

export default Modal