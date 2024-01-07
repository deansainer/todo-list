import React, { useState } from 'react'
import Modal from './Modal'

const ListHeader = ({listname, getTodos}) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='list-header'>
      <h2>{listname}</h2>
      <div className='button-container'>
        <button onClick={() => setShowModal(true)} className='create'> Add new</button>
        <button className='sign-out'> Sign out</button>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getTodos={getTodos}/>}
    </div>
  )
}

export default ListHeader