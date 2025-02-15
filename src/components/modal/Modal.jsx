import React from 'react'



const Modal = ({ isOpen, onClose, onConfirm }) => {

    if (!isOpen) return null;

  return (
    <div className='flex fixed justify-center items-center z-[1000] top-0 left-0 right-0 bottom-0' style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
      <div className='bg-white p-8 border-2 w-[500px] text-center' >
        <h2 className='font-semibold text-lg'>Are you sure you want to delete?</h2>
        <div className='mt-4'>
          <button className='bg-black text-white cursor-pointer border-0 px-5 py-1 mx-2' onClick={onClose}>
            Cancel
          </button>
          <button className='bg-red-700 text-white cursor-pointer border-0 px-5 py-1 mx-2' onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
