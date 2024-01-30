import {useState} from 'react'
import React from "react";
import TickItem from "./TickIcon";
import Modal from './Modal';
import axios from 'axios'

const ListItem = (props) => {
  const [showModal, setShowModal] = useState(false)

  async function deleteTodo(e) {
    e.preventDefault()
    try {
      const deletedTodo = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${props.task.id}`)
      props.getTodos()
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <li className="list_item">
      <div className="info_container">
        <TickItem />
        <p className="task_title">{props.task.title}</p>
      </div>
      <div className='progress'>
          <span>Progress:</span>
          <input className='slider' type="range" value={props.task.progress} disabled/>
        </div>
      <div className="task_action_buttons">
        <img src='https://cdn-icons-png.flaticon.com/128/1827/1827933.png' onClick={() => setShowModal(true)} className="edit"/>
        <img src='https://cdn-icons-png.flaticon.com/128/484/484662.png' onClick={deleteTodo} className="delete"/>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={props.task} getTodos={props.getTodos}/>}
    </li>
  );
};

export default ListItem;
