import React, { useState } from 'react'
import Modal from './Modal'
import {useCookies} from 'react-cookie'

const ListHeader = ({listname, getTodos}) => {
  const [showModal, setShowModal] = useState(false)
  const [cookies, setCookies, removeCookies] = useCookies(null)
    
  function signOut() {
    removeCookies('Email')
    removeCookies('AuthToken')
    window.location.reload()
  }
  return (
    <div className='list-header'>
      <h1>{listname}</h1>
      <div className='button-container'>
        <img src='https://img.icons8.com/?size=50&id=37839&format=png' onClick={() => setShowModal(true)} className='create'/>
        <img src='https://img.icons8.com/?size=50&id=8119&format=png' onClick={signOut} className='sign-out'/>
      </div>
      {showModal && <Modal mode={'create'} setShowModal={setShowModal} getTodos={getTodos}/>}
    </div>
  )
}

export default ListHeader