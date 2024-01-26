import React, { useState } from 'react'
import Modal from './Modal'
import {useCookies} from 'react-cookie'

const ListHeader = ({listname, getTodos}) => {
  const [showModal, setShowModal] = useState(false)
  const [cookies, setCookies, removeCookies] = useCookies(null)
  
  const userEmail = cookies.Email
  function signOut() {
    removeCookies('Email')
    removeCookies('AuthToken')
    window.location.reload()
  }
  return (
    <div className='list-header'>
      <h2>{listname}</h2>
      <div className='button-container'>
        <button onClick={() => setShowModal(true)} className='create'> Add new</button>
        <button onClick={signOut} className='sign-out'> Sign out</button>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getTodos={getTodos}/>}
    </div>
  )
}

export default ListHeader