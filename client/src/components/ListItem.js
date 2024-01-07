import {useState} from 'react'
import React from "react";
import TickItem from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from './Modal';
import axios from 'axios'

const ListItem = (props) => {
  const [showModal, setShowModal] = useState(false)

  async function deleteTodo(e) {
    e.preventDefault()
    try {
      const deletedTodo = await axios.delete(`http://localhost:8000/api/todos/${props.task.id}`)
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
      <div className="task_action_buttons">
        <button onClick={() => setShowModal(true)} className="edit">Edit</button>
        <button onClick={deleteTodo} className="delete">Del</button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={props.task} getTodos={props.getTodos}/>}
    </li>
  );
};

export default ListItem;
